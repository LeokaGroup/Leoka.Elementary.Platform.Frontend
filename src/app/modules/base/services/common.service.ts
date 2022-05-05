import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

/**
 * Сервис общих функций.
 */
@Injectable()
export class CommonDataService {
    currentRoute: any;

    constructor(private router: Router) {
            
    }

    public routeToStart(err: any) {
        console.log("routeToStart", err);

        if (err.status === 0) {        
            sessionStorage.clear();
            
            this.router.navigate(["/user/signin"]);
        }
    };
};
