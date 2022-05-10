import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { KnowledgeRoutingModule } from './knowledge-routing.module';
import { KnowledgeLkModule } from './knowledge-lk/knowledge-lk.component';

@NgModule({
    declarations: [KnowledgeLkModule],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        KnowledgeRoutingModule,
        ButtonModule,
        HttpClientModule
    ],
    exports: [],
    providers: [],
})

export class KnowledgeModule { }