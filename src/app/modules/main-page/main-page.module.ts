import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MainPageService } from './services/main-page.service';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainModule } from './components/main-page.component';

@NgModule({
    declarations: [MainModule],
    imports: [ CommonModule, CheckboxModule, DropdownModule, FormsModule, ReactiveFormsModule, MainPageRoutingModule, ButtonModule, TabViewModule, ToastModule, DialogModule, HttpClientModule ],
    exports: [],
    providers: [MainPageService ],
})

export class MainPageModule {}