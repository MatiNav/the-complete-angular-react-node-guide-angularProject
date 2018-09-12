import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/shared/session.storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private sessionStrgSrvc: SessionStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStrgSrvc.getSessionToken()
        if(token){
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        }

        return next.handle(req);
    }
}