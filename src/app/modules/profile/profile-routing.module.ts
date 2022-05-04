import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileStartModule } from './profile-start/components/profile-start.component';

const routes: Routes = [
    {
        path: 'start', component: ProfileStartModule
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProfileRoutingModule { }
