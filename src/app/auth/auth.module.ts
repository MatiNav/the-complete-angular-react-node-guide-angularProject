import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { FormMethodsService } from 'src/app/auth/shared/formMethods.service';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';


@NgModule({
    declarations: [
        AuthComponent,
        RegisterComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule
        
    ],
    providers: [
        AuthService,
        FormMethodsService,
    ]
})
export class AuthModule { }