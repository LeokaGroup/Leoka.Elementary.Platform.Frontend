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
import { HeaderService } from './services/header.service';
import { HeaderModule } from './components/header.component';
import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
    declarations: [HeaderModule],
    imports: [ CommonModule, CheckboxModule, DropdownModule, FormsModule, ReactiveFormsModule, HeaderRoutingModule, ButtonModule, TabViewModule, ToastModule, DialogModule, HttpClientModule ],
    exports: [],
    providers: [HeaderService],
})

export class HeaderMainModule {}