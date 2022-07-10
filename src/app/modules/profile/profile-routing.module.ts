import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileFormModule } from './profile-form/components/profile-form.component';
import { TemplateModule } from './profile-lesson-template/components/profile-lesson-template.component';
import { ProfileMenuModule } from './profile-menu/components/profile-menu.component';
import { ProfileStartModule } from './profile-start/components/profile-start.component';

const routes: Routes = [
    {
        path: 'welcome', component: ProfileStartModule
    },

    {
        path: '', component: ProfileMenuModule
    },

    {
        path: 'form', component: ProfileFormModule
    },

    {
        path: 'template', component: TemplateModule
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProfileRoutingModule { }
