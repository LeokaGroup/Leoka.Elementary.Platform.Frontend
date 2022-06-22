import { Injectable } from "@angular/core";
import { NavigationStart, Router, Event as NavigationEvent } from "@angular/router";
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
        this._router.events
            .subscribe((event: NavigationEvent) => {
                if (event instanceof NavigationStart) {
                    console.log(event.url);    
                    if (event.url !== '/profile/signup') {
                        return;
                    }                      
                }
            });    
            
            if (err.status === 403) {        
                sessionStorage.clear();
                
                this._router.navigate(["/user/signin"]);
            }
    };
};
