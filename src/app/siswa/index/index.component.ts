import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

class Siswa {
    id: number;
    nama: string;
    kelas: string;
    alamat: string;
    nis: number;
}

class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})

export class IndexComponent implements AfterViewInit, OnDestroy, OnInit {
    siswas: Siswa[];
    uri = 'http://34.71.98.134/api/';
    @ViewChild(DataTableDirective) dtElement: DataTableDirective; dtOptions: DataTables.Settings = {}; dtInstance: DataTables.Api; dtTrigger = new Subject();
    constructor(private http: HttpClient, private toastr: ToastrService) {
    }
    showSuccess() {
        this.toastr.success('Data Berhasil Dihapus', 'Sukses');
    }
    showError() {
        this.toastr.error('Data Gagal Dihapus', 'Gagal');
    }

    ngOnInit(): void {
        const that = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
                that.http
                    .post<DataTablesResponse>(
                        'http://34.71.98.134/api/get-siswa/', dataTablesParameters, {}).toPromise().then(resp => {
                    that.siswas = resp.data;
                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: []
                    });
                });
            },
            columns: [{data: 'id'}, {data: 'nama'}, {data: 'nis'}, {data: 'kelas'}, {data: 'alamat'}, {data: 'aksi'}]
        };

    }

    onDelete(key) {
        if (confirm('Apakah anda yakin ingin menghapus data ini ?')) {
            this.http.delete(`${this.uri}siswa/${key}`)
                .subscribe(
                    data => {
                        this.showSuccess();
                        this.rerender();
                    },
                    error => {
                        // window.scrollTo(0, 0);
                        this.showError();
                    }
                );

        }
    }
    rerender(): void {
         this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
        });
    }
    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }
}
