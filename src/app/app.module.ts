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
import { NgxLoadingModule } from "ngx-loading";
import { NetworkService } from "./modules/base/services/network.service";
import { NetworkInterceptor } from "./core/interceptors/network-interceptor";
import { CommonDataService } from "./modules/base/services/common.service";
import { ProfileService } from "./modules/profile/services/profile.service";
import { KnowledgeLkModule } from './modules/knowledge/knowledge-lk/knowledge-lk.component';
import {UserMainModule} from "./modules/user/user.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderModule,
    FooterModule,
    KnowledgeLkModule
  ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        ButtonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxLoadingModule.forRoot({
            primaryColour: '#7C3AED',
            secondaryColour: '#7C3AED',
            tertiaryColour: '#7C3AED',
            fullScreenBackdrop: true
        }),
        UserMainModule
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
    NetworkService,
    CommonDataService,
    ProfileService
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
