import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/shared/session.storage.service';
import { SessionService } from 'src/app/shared/session.service';

@Component({
    selector:'header',
    templateUrl: './header.component.html',
    styleUrls:['./header.component.scss']
})
export class HeaderComponent{

    constructor(private sessionSrvc:SessionService){}


}