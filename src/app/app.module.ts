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
import { MainPageService } from "./modules/main-page/services/main-page.service";
import { HeaderModule } from "./modules/header/components/header.component";
import { HeaderService } from "./modules/header/services/header.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderModule
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [RoleService, MainPageService, HeaderService],

  bootstrap: [AppComponent]
})

export class AppModule { }
