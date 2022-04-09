import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageModule } from './modules/main-page/main-page.component';

const routes: Routes = [
  {
    path: "",
    component: MainPageModule
  },

  {
    path: "user",
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserMainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
