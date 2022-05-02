import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { forkJoin } from "rxjs";
import { MainPageService } from "../services/main-page.service";
import { NavigationStart, Router, Event as NavigationEvent } from "@angular/router";

@Component({
    selector: "main-page",
    templateUrl: "./main-page.component.html",
    styleUrls: ["./main-page.component.scss"]
})

/**
 * Класс модуля Главной страницы.
 */
export class MainModule implements OnInit {
    public readonly mainFon$ = this.mainPageService.mainFon$;
    public readonly reception$ = this.mainPageService.reception$;
    public readonly begin$ = this.mainPageService.begin$;
    public readonly best$ = this.mainPageService.best$;
    public readonly smartClass$ = this.mainPageService.smartClass$;
    public readonly options$ = this.mainPageService.options$;
    public readonly about$ = this.mainPageService.about$;
    public readonly request$ = this.mainPageService.request$;
    public readonly mentor$ = this.mainPageService.mentor$;
    public readonly mainMentor$ = this.mainPageService.mainMentor$;

    // Форма заявки.
    requestForm : FormGroup = new FormGroup({
        "requestFirstName": new FormControl("", Validators.required),
        "requestLastName": new FormControl("", Validators.required),
        "requestEmail": new FormControl("", Validators.required),
        "requestPhoneNumber": new FormControl("", Validators.required),
        "requestMessage": new FormControl("", Validators.required)
    });

    constructor(private mainPageService: MainPageService,
        private _router: Router) {};

    public async ngOnInit() {     
        // Параллельно получает данные на ините страницы.   
        forkJoin([
            await this.getFonAsync(),
            await this.getReceptionAsync(1),
            await this.getBeginAsync(1),
            await this.getBestAsync(),
            await this.getSmartClassAsync(),
            await this.getOptionsAsync(),
            await this.getAboutAsync(),
            await this.getRequestAsync(),
            await this.getMentorAsync(),
            await this.getMainMentorAsync()
        ]).subscribe();
    };    

    /**
     * Функция получит список элементов хидера.
     * @returns - Список элементов хидера.
     */
    private async getFonAsync() {
        (await this.mainPageService.getMainFonItemsAsync())
        .subscribe(_ => {
            console.log("Данные фона студента: ", this.mainFon$.value);
        });
    };

    /**
     * Функция получит данные для блока записи на бесплатный урок.
     * @typeRole - Тип роли.
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
     * Функция получит список вопросов.
     * @returns - Список вопросов с вариантами ответов.
     */
    private async getBestAsync() {
        (await this.mainPageService.getBestAsync())
        .subscribe(_ => {
            console.log("Список вопросов: ", this.best$.value);
        });
    };

     /**
     * Функция получит данные для блоа умного класса.
     * @returns - Данные для блока.
     */
      private async getSmartClassAsync() {
        (await this.mainPageService.getSmartClassAsync())
        .subscribe(_ => {
            console.log("Данные умного класса: ", this.smartClass$.value);
        });
    };

     /**
     * Функция получит данные для списка вопросов.
     * @returns - Данные для списка.
     */
    private async getOptionsAsync() {
        (await this.mainPageService.getOptionsAsync())
        .subscribe(_ => {
            console.log("Данные для списка вопросов: ", this.options$.value);
        });
    };

    /**
     * Функция получит данные о платформе.
     * @returns - Данные блока.
     */
    private async getAboutAsync() {
        (await this.mainPageService.getAboutAsync())
        .subscribe(_ => {
            console.log("Данные о платформе: ", this.about$.value);
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

    /**
     * Функция получит данные блока преподавателя.
     * @returns - Данные блока.
     */
    private async getMentorAsync() {
        (await this.mainPageService.getMentorAsync())
        .subscribe(_ => {
            console.log("Данные блока преподавателя: ", this.mentor$.value);
        });
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
}
