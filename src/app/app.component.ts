import { Component } from '@angular/core';
import { NetworkService } from './modules/base/services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public loading$ = this.loader.loading$;

  constructor(public loader: NetworkService) {}
}
