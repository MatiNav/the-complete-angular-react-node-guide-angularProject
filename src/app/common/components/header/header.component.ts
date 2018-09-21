import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/common/services/session.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(public sessionSrvc: SessionService, private router: Router) { }


    onSearch(city) {
        if (city) {
            this.router.navigate([`/rental/${city}/homes`])
        }
    }
    
}