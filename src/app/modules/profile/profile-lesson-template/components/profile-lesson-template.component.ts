import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { ProfileTemplatesService } from "../../services/template.service";
import { ItemTemplate } from "../models/shared/item-template";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: "lesson-template",
    templateUrl: "./profile-lesson-template.component.html",
    styleUrls: ["./profile-lesson-template.component.scss"]
})

/**
 * Класс модуля создания шаблона урока.
 */
export class TemplateModule implements OnInit {
    constructor(private _profileTemplateService: ProfileTemplatesService,
        private _sanitizer: DomSanitizer) { };

    public readonly profileItemTemplates$ = this._profileTemplateService.profileItemTemplates$;
    public readonly profileTemplates$ = this._profileTemplateService.profileTemplates$;
    public readonly profileGeneratedTemplate$ = this._profileTemplateService.profileGeneratedTemplate$;

    selectedItemTemplates = new ItemTemplate();
    selectedTemplate: ItemTemplate = new ItemTemplate();
    htmlData: any;
    data: any;

    public async ngOnInit() {
        forkJoin([
            await this.getProfileItemsAsync()
        ]);
    };

    /**
     * Функция получит список шаблонов для выбора.
     * @returns - Список шаблонов.
     */
    private async getProfileItemsAsync() {
        (await this._profileTemplateService.getProfileTemplatesAsync())
            .subscribe(_ => {
                console.log("Список шаблонов: ", this.profileTemplates$.value);
            });
    };

    /**
     * Функция получает шаблоны урока.
     * @returns - Шаблоны урока.
     */
    public async onSelectItemTemplatesAsync() {
        (await this._profileTemplateService.getSelectedItemTemplatesAsync(this.selectedItemTemplates.templateItemId))
            .subscribe(_ => {
                console.log("Шаблоны предмета: ", this.profileItemTemplates$.value);
            });
    };

    /**
     * Функция генерирует выбранный шаблон урока.
     * @returns - Xml-шаблон.
     */
    public async onGenerateTemplateAsync() {
        console.log("selectedTemplate", this.selectedTemplate.templateId);

        (await this._profileTemplateService.generateTemplateAsync(this.selectedTemplate.templateId))
            .subscribe(response => {
                console.log("Генерация шаблона урока: ", response);
                const parser = new DOMParser();
                const xml = parser.parseFromString(response.template, 'application/xml');
                let xmlData: any = xml.documentElement;
                console.log('type is', typeof xmlData);
                console.log('typva is', xmlData);            
                this.htmlData = this._sanitizer.bypassSecurityTrustHtml(response.template);
                this.data = response.template;
            });            
    };

    /**
     * Функция сохраняет шаблон преподавателя, который он заполнил.
     */
    public async onSaveTemplateAsync() {
        console.log("htmlData", this.htmlData);
    };
}
