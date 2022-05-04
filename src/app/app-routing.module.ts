import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./modules/main-page/main-page.module').then(m => m.MainPageModule)
  },

  {
    path: "user",
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserMainModule)
  },

  {
    path: "mentor",
    loadChildren: () => import('./modules/mentor/mentor.module').then(m => m.MainMentorModule)
  },

  {
    path: "profile",
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
