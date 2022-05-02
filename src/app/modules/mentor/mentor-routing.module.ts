import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorModule } from './main-mentor-page/components/main-mentor-page.component';

const routes: Routes = [
    {
        path: '', component: MentorModule
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainMentorRoutingModule { }
