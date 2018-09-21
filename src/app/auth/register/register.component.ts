import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormMethodsService } from 'src/app/auth/shared/formMethods.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {}
  errors = []

  constructor(private authSrvc: AuthService, private router:Router, public formMethodsSrvc:FormMethodsService) { }

  ngOnInit() {
  }

  onRegister(registerForm){
    this.authSrvc.registerUser(this.formData)
    .subscribe(
      data=>{
        this.router.navigate(['/login',{registered:true}])
      },
      (errorResponse)=>{
        this.errors = errorResponse.error.errors
      }
    )
  }

  

}
