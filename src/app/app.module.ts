import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './modules/header/header.component';
import { MainPageModule } from './modules/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageModule,
    HeaderModule
  ],

  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})

export class AppModule { }
