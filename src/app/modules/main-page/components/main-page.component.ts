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

    constructor(private mainPageService: MainPageService) {};

    public async ngOnInit() {        
       await this.getHeaderItemsAsync();
    };    

    private async getHeaderItemsAsync() {
        (await this.mainPageService.getMainFonItemsAsync())
        .subscribe(response => {
            console.log("Данные фона студента: ", this.mainFon$.value);
        });
    };
}
