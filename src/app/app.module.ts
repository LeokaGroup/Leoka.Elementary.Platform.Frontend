import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './modules/header/header.component';
import { MainPageModule } from './modules/main-page/main-page.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    MainPageModule,
    HeaderModule
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})

export class AppModule { }
