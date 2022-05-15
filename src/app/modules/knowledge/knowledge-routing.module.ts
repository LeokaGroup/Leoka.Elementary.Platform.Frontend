import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgeLkModule } from './knowledge-lk/knowledge-lk.component';

const routes: Routes = [
    {
        path: '', component: KnowledgeLkModule
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class KnowledgeRoutingModule { }
