import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SiswaService {

    uri = 'http://34.71.98.134/api/';

    constructor(private http: HttpClient) { }

    addSiswa(nama, nis, kelas, alamat) {
        const obj = {
            nama, nis, kelas, alamat
        };
        console.log(obj);
        this.http.post(`${this.uri}siswa`, obj)
            .subscribe(
                data => console.log('success', data),
                error => console.log('oops', error)
            );
    }
}
