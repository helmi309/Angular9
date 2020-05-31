import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  uri = 'http://34.71.98.134/api/';
  error: boolean;
  message: string[];
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private toastr: ToastrService) {
    this.createForm();
  }
  showSuccess() {
    this.toastr.success('Data Berhasil Tersimpan', 'Sukses');
  }
  createForm() {
    this.error = false;
    this.angForm = this.fb.group({
      nama: ['', Validators.required],
      kelas: ['', Validators.required],
      alamat: ['', Validators.required],
      nis: ['', [Validators.required]]
    });
  }
  addSiswa(nama, nis, kelas, alamat) {
    this.error = false;
    this.message = [];

    const obj = {
      nama, nis, kelas, alamat
    };
    this.http.post(`${this.uri}siswa`, obj)
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
  ngOnInit(): void {
  }

}
