import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class LoadingService {
    private _loading = new BehaviorSubject<boolean>(false);
    public readonly loading$ = this._loading;
  
    constructor() {}
  
    public setBusy(isBusy: boolean) {
        console.log("setBusy", isBusy);
        this._loading.next(isBusy);
    };
  }