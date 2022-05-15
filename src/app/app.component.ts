import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event as NavigationEvent } from "@angular/router";
import { NetworkService } from './modules/base/services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public loading$ = this.networkService.loading$;
  public currentRoute: string = "";

  constructor(public networkService: NetworkService,
    private _router: Router) { }

  public ngOnInit() {
    this.checkRouteUrl();
  };

  private checkRouteUrl() {
    this._router.events
      .subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationStart) {
            console.log(event.url);
            this.currentRoute = event.url;
          }
        });
  };
}
