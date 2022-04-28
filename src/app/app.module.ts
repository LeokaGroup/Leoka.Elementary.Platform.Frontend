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
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RoleService } from "./modules/user/services/role.service";
import { MainPageService } from "./modules/main-page/services/main-page.service";
import { HeaderModule } from "./modules/header/components/header.component";
import { HeaderService } from "./modules/header/services/header.service";
import { FooterService } from "./modules/footer/services/footer.service";
import { FooterModule } from "./modules/footer/components/footer.component";
// import { NgxLoadingModule } from "ngx-loading";
import { NetworkService } from "./modules/base/services/network.service";
import { NetworkInterceptor } from "./core/interceptors/network-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderModule,
    FooterModule
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // NgxLoadingModule.forRoot({
    //   primaryColour: '#7C3AED',
    //   secondaryColour: '#7C3AED',
    //   tertiaryColour: '#7C3AED',
    //   fullScreenBackdrop: true
    // })
  ],

  providers: [
    RoleService,
    MainPageService,
    HeaderService,
    FooterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    },
    NetworkService
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
