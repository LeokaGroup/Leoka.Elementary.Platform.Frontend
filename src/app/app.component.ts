import { Component } from '@angular/core';
import { LoadingService } from './modules/base/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public loading$ = this.loader.loading$;

  constructor(public loader: LoadingService) {}
}
