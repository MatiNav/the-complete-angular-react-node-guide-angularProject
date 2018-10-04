import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RentalModule } from 'src/app/rental/rental.module';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionStorageService } from 'src/app/common/services/session.storage.service';
import { SessionService } from 'src/app/common/services/session.service';
import { AuthInterceptor } from 'src/app/common/interceptors/auth.interceptor';
import { HelperService } from 'src/app/common/services/helper.service';
import { CommonAppModule } from 'src/app/common/commonApp.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { AuthGuard } from 'src/app/common/guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonAppModule,
    AppRoutingModule,
    NgbModule,
    NgPipesModule
  ],
  providers: [
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
