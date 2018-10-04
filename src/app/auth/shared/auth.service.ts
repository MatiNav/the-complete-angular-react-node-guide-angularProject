import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment'
import { SessionStorageService } from 'src/app/common/services/session.storage.service';
import { SessionService } from 'src/app/common/services/session.service';

const jwt = new JwtHelperService();


@Injectable()
export class AuthService {


    constructor(
        private http: HttpClient, private sessionsrvc: SessionService,
        private sessionStrgSrvc: SessionStorageService) {

    }



    registerUser(user) {
        return new Observable<any>((observer) => {

            this.http.post('/api/v1/users', user)
                .subscribe(
                data => {
                    observer.next('ok')
                    observer.complete()
                },
                (error: HttpErrorResponse) => {
                    observer.error(error)
                    observer.complete()

                }
                )
        })
    }


    loginUser(user) {
        return new Observable<any>((observer) => {
            this.http.post('/api/v1/users/auth', user)
                .subscribe(
                (token: string) => {
                    this.sessionsrvc.decodedToken = jwt.decodeToken(token);
                    
                    this.sessionStrgSrvc.setSessionDecodedToken(this.sessionsrvc.decodedToken)
                    this.sessionStrgSrvc.setSessionToken(token)
                    observer.next('ok')
                    observer.complete()
                },
                (error: HttpErrorResponse) => {
                    observer.error(error)
                    observer.complete()

                }
                )
        })
    }


}
