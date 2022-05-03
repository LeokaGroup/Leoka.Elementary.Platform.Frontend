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
    public readonly smartClass$ = this.mainPageService.smartClass$;
    public readonly request$ = this.mainPageService.request$;

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
            await this.getSmartClassAsync(2),
            await this.getRequestAsync()
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

    /**
     * Функция получит данные для блоа умного класса.
     * @typeRole - Тип роли.
     * @returns - Данные для блока.
     */
     private async getSmartClassAsync(typeRole: number) {
        (await this.mainPageService.getSmartClassAsync(typeRole))
        .subscribe(_ => {
            console.log("Данные умного класса: ", this.smartClass$.value);
        });
    };

    /**
     * Функция получит данные для блока заявки.
     * @returns - Данные блока.
     */
     private async getRequestAsync() {
        (await this.mainPageService.getRequestAsync())
        .subscribe(_ => {
            console.log("Данные блока заявки: ", this.request$.value);
        });
    };

    public async onCreateRequest() {

    };
}
