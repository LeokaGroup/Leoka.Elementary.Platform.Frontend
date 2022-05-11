import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileStartModule } from './profile-start/components/profile-start.component';
import { ProfileStartService } from './profile-start/services/profile-start.service';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileMenuModule } from './profile-menu/components/profile-menu.component';
import { ProfileMenuService } from './profile-menu/services/profile-menu.service';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { NetworkInterceptor } from 'src/app/core/interceptors/network-interceptor';
import { CommonDataService } from '../base/services/common.service';
import { ProfileService } from './services/profile.service';
import {MegaMenuModule} from 'primeng/megamenu';
import { ProfileFormModule } from './profile-form/components/profile-form.component';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
    declarations: [
        ProfileStartModule, 
        ProfileMenuModule,
        ProfileFormModule        
    ],

    imports: [
        CommonModule,
        CheckboxModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        ProfileRoutingModule,
        ButtonModule,
        TabViewModule,
        ToastModule,
        DialogModule,
        HttpClientModule,
        TieredMenuModule,
        MegaMenuModule,
        FileUploadModule,
        InputTextModule,
        
    ],

    exports: [],

    providers: [
        ProfileStartService,
        ProfileMenuService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NetworkInterceptor,
            multi: true
        },
        CommonDataService,
        ProfileService
    ],
})

export class ProfileModule { }