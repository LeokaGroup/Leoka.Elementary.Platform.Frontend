import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { forkJoin } from "rxjs";
import { MainPageService } from "src/app/modules/main-page/services/main-page.service";

@Component({
    selector: "main-mentor-page",
    templateUrl: "./main-mentor-page.component.html",
    styleUrls: ["./main-mentor-page.component.scss"]
})

/**
 * Класс модуля Главной страницы преподавателя.
 */
export class MentorModule implements OnInit {
    public readonly mainMentor$ = this.mainPageService.mainMentor$;
    public readonly reception$ = this.mainPageService.reception$;
    public readonly begin$ = this.mainPageService.begin$;

    // Форма заявки.
    requestForm : FormGroup = new FormGroup({
        "requestFirstName": new FormControl("", Validators.required),
        "requestLastName": new FormControl("", Validators.required),
        "requestEmail": new FormControl("", Validators.required),
        "requestPhoneNumber": new FormControl("", Validators.required),
        "requestMessage": new FormControl("", Validators.required)
    });

    constructor(private mainPageService: MainPageService) {};

    public async ngOnInit() {     
        // Параллельно получает данные на ините страницы.   
        forkJoin([
            await this.getMainMentorAsync(),
            await this.getReceptionAsync(2),
            await this.getBeginAsync(2),
        ]).subscribe();
    };    

    /**
     * Функция получит данные блока преподавателя.
     * @returns - Данные блока.
     */
     private async getMainMentorAsync() {
        (await this.mainPageService.getMainMentorAsync())
        .subscribe(_ => {
            console.log("Преподавателя: ", this.mainMentor$.value);
        });
    };

    /**
     * Функция получит данные для блока записи на бесплатный урок.
     * @returns - Данные блока.
     */
     private async getReceptionAsync(typeRole: number) {
        (await this.mainPageService.getReceptionAsync(typeRole))
        .subscribe(_ => {
            console.log("Данные записи на урок: ", this.reception$.value);
        });
    };

    /**
     * Функция получит данные для блока с чего начать.
     * @typeRole - Тип роли.
     * @returns - Данные блока.
     */
     private async getBeginAsync(typeRole: number) {
        (await this.mainPageService.getBeginAsync(typeRole))
        .subscribe(_ => {
            console.log("Данные с чего начать: ", this.begin$.value);
        });
    };
}
