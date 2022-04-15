import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageModule } from './components/main-page.component';

const routes: Routes = [
    {
        path: '', component: MainPageModule
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainPageRoutingModule { }
