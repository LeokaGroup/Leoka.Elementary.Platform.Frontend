import { Component, OnInit } from "@angular/core";

@Component({
    selector: "lesson-template",
    templateUrl: "./profile-lesson-template.component.html",
    styleUrls: ["./profile-lesson-template.component.scss"]
})

/**
 * Класс модуля создания шаблона урока.
 */
export class TemplateModule implements OnInit {
    constructor() { };

    public async ngOnInit() {
        console.log("TemplateModule");
    };
}
