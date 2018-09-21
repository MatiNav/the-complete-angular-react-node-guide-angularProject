import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { SessionService } from 'src/app/common/services/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private url: string

    constructor(private sessionSrvc:SessionService, private router: Router) { }

    private isLoginOrRegisterPage(): boolean {
        if(this.url.includes('auth')){
            return true
        }

        return false
    }

    private handleUserAuthenticated(): boolean{
        if(this.isLoginOrRegisterPage()){
            this.router.navigate(['/rental'])
            return false
        }

        return true
    }

    private handleUserNotAuthenticated(): boolean{
        if(!this.isLoginOrRegisterPage()){
            this.router.navigate(['/auth'])
            return false
        }

        return true
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.url = state.url
        
        if(this.sessionSrvc.isAuthenticated()){
           return this.handleUserAuthenticated()
        } 
           
        return this.handleUserNotAuthenticated()
    }

}