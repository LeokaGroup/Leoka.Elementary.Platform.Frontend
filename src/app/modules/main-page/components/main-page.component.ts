import { Component, OnInit } from "@angular/core";
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

    constructor(private mainPageService: MainPageService) {};

    public async ngOnInit() {        
       await this.getHeaderItemsAsync();
       await this.getReceptionAsync();
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

    private async getReceptionAsync() {
        (await this.mainPageService.getReceptionAsync())
        .subscribe(_ => {
            console.log("Данные записи на урок: ", this.reception$.value);
        });
    };
}
