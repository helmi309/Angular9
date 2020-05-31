import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import 'bootstrap/dist/css/bootstrap.css';
@Component({ selector: 'app-login', templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    datauser: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private toastr: ToastrService
    ) {
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }
    showError(message) {
        this.toastr.error('Kombinasi email dan password salah.', 'Gagal');
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.datauser = data;
                    if (this.datauser.success) {
                        // this.router.navigate(['dashboard']);
                        // this.router.navigateByUrl('/dashboard');
                        window.location.reload();
                    } else {
                        this.showError(this.datauser.result.message);
                        this.alertService.error(this.datauser);
                        this.loading = false;
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
