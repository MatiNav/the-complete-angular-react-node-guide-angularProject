import { AuthService } from 'src/app/auth/shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormMethodsService } from 'src/app/auth/shared/formMethods.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm :FormGroup
  notifyMessage= ''
  errors = []

  constructor(private fb:FormBuilder, private formMethodsSrvc:FormMethodsService, private authSrvc:AuthService,
              private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.initLoginForm()
    this.route.params.subscribe(
      params=>{
        if(params['registered']){
          this.notifyMessage= "You have successfully registered !!"
        }
      }
    )
  }
  

  initLoginForm(){
    this.loginForm = this.fb.group({
      email: ['',[ Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
      password: ['', Validators.required]
  })
  }

  
  onLogin(){

    this.authSrvc.loginUser(this.loginForm.value)
    .subscribe(
      success=>{
        this.router.navigate(['/rentals'])
      },
      (errorResponse)=>{
        this.errors = errorResponse.error.errors
      }
    )
  }

}
