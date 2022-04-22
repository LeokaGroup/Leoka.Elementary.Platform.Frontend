import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from './components/main-page.component';

const routes: Routes = [
    {
        path: '', component: MainModule
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainPageRoutingModule { }
