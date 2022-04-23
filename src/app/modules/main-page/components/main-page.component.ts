import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { MainPageService } from "../services/main-page.service";

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

    constructor(private mainPageService: MainPageService) {};

    public async ngOnInit() {        
       await this.getHeaderItemsAsync();
       await this.getReceptionAsync();
       await this.getBeginAsync();

        forkJoin([
            await this.getHeaderItemsAsync(),
            await this.getReceptionAsync(),
            await this.getBeginAsync()
        ]).subscribe();
    };    

    /**
     * Функция получит список элементов хидера.
     * @returns - Список элементов хидера.
     */
    private async getHeaderItemsAsync() {
        (await this.mainPageService.getMainFonItemsAsync())
        .subscribe(_ => {
            console.log("Данные фона студента: ", this.mainFon$.value);
        });
    };

    /**
     * Функция получит данные для блока записи на бесплатный урок.
     * @returns - Данные блока.
     */
    private async getReceptionAsync() {
        (await this.mainPageService.getReceptionAsync())
        .subscribe(_ => {
            console.log("Данные записи на урок: ", this.reception$.value);
        });
    };

    /**
     * Функция получит данные для блока с чего начать.
     * @returns - Данные блока.
     */
    private async getBeginAsync() {
        (await this.mainPageService.getBeginAsync())
        .subscribe(_ => {
            console.log("Данные с чего начать: ", this.begin$.value);
        });
    };
}
