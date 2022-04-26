import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from './components/footer.component';

const routes: Routes = [
    {
        path: '', component: FooterModule
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FooterRoutingModule { }
