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

    constructor(private _router: Router) {
            
    }

    public routeToStart(err: any) {
        if (err.status === 403) {
            sessionStorage.clear();

            this._router.navigate(["/user/signin"]);
        }
    };
};
