import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInModule } from './components/signip/signin.component';
import { SignUpModule } from './components/signup/signup.component';

const routes: Routes = [
    {
        path: 'signup', component: SignUpModule
    },

    {
        path: 'signin', component: SignInModule
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }
