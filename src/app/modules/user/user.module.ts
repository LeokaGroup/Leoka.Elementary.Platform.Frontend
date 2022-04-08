import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import { SignUpModule } from './components/signup/signup.component';
import { UserService } from './services/user.service';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [SignUpModule],
    imports: [ CommonModule, CheckboxModule, DropdownModule, FormsModule, ReactiveFormsModule, UserRoutingModule, ButtonModule, TabViewModule, ToastModule, DialogModule, HttpClientModule ],
    exports: [],
    providers: [UserService],
})

export class UserMainModule {}