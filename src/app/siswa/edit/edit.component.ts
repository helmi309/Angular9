import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  uri = 'http://34.71.98.134/api/';
  error: boolean;
  message: string[];
  angForm: FormGroup;
  siswa: any = {};
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) {
    this.editForm();
  }
  showSuccess() {
    this.toastr.success('Data Berhasil Update', 'Sukses');
  }

  editForm() {
    this.angForm = this.fb.group({
      nama: ['', Validators.required],
      kelas: ['', Validators.required],
      alamat: ['', Validators.required],
      nis: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.http.get(`${this.uri}siswa/${params[`id`]}`)
          .subscribe(
              data => {
                this.siswa = data;
                console.log(data);
              },
              error => {
                // window.scrollTo(0, 0);
                console.log(this.error);

              }
          );
    });
  }
  updateSiswa(row) {
    this.error = false;
    this.message = [];

    this.http.put(`${this.uri}siswa/${row.id}`, row)
        .subscribe(
            data => {
              this.showSuccess();
              this.router.navigate(['siswa']);
            },
            error => {
              // window.scrollTo(0, 0);
              this.error = true;
              this.message = error.error.error;
            }
        );
  }
}
