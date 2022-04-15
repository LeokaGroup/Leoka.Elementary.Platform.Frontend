import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { RoleService } from "./modules/user/services/role.service";
import { MainPageModule } from "./modules/main-page/components/main-page.component";
import { HeaderModule } from "./modules/header/components/header.component";

@NgModule({
  declarations: [
    AppComponent,
    MainPageModule,
    HeaderModule
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [RoleService],

  bootstrap: [AppComponent]
})

export class AppModule { }
