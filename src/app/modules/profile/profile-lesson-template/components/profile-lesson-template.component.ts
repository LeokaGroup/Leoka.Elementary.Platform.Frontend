import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { ProfileTemplatesService } from "../../services/template.service";

@Component({
    selector: "lesson-template",
    templateUrl: "./profile-lesson-template.component.html",
    styleUrls: ["./profile-lesson-template.component.scss"]
})

/**
 * Класс модуля создания шаблона урока.
 */
export class TemplateModule implements OnInit {
    constructor(private profileTemplateService: ProfileTemplatesService) { };

    public readonly profileItemTemplates$ = this.profileTemplateService.profileItemTemplates$; 
    public readonly profileTemplates$ = this.profileTemplateService.profileTemplates$; 

    selectedTemplate: any;

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
        (await this.profileTemplateService.getProfileTemplatesAsync())
        .subscribe(_ => {
            console.log("Список шаблонов: ", this.profileTemplates$.value);
        });
    };

    public async onSelectItemTemplatesAsync() {    
        (await this.profileTemplateService.getSelectedItemTemplatesAsync(1))
        .subscribe(_ => {
            console.log("Шаблоны предмета: ", this.profileItemTemplates$.value);
        });
    };

    onSelectTemplateAsync() {

    };
}
