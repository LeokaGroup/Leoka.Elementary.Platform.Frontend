import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

/**
 * Сервис общих функций.
 */
@Injectable()
export class CommonDataService {
    currentRoute: any;
    public readonly isVisibleHeaderItems$ = new BehaviorSubject<boolean>(false);

    constructor(private router: Router) {
            
    }

    public routeToStart(err: any) {
        if (err.status === 0) {        
            sessionStorage.clear();
            
            this.router.navigate(["/user/signin"]);
        }
    };
};
