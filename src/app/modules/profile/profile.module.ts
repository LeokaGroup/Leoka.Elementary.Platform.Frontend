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
import { ProfileStartModule } from './profile-start/components/profile-start.component';
import { ProfileStartService } from './profile-start/services/profile-start.service';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileStartGuard } from 'src/app/core/guards/profile-start.guard';

@NgModule({
    declarations: [ProfileStartModule],
    imports: [ CommonModule, CheckboxModule, DropdownModule, FormsModule, ReactiveFormsModule, ProfileRoutingModule, ButtonModule, TabViewModule, ToastModule, DialogModule, HttpClientModule ],
    exports: [],
    providers: [ProfileStartService, ProfileStartGuard ],
})

export class ProfileModule {}