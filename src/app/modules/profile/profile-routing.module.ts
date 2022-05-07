import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileMenuModule } from './profile-menu/components/profile-menu.component';
import { ProfileStartModule } from './profile-start/components/profile-start.component';

const routes: Routes = [
    {
        path: 'welcome', component: ProfileStartModule
    },

    {
        path: '', component: ProfileMenuModule
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProfileRoutingModule { }
