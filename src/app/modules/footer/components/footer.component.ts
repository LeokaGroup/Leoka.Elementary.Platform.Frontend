import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { RoleService } from "../../user/services/role.service";
import { FooterItems } from "../models/output/footer-items";
import { FooterService } from "../services/footer.service";

@Component({
    selector: "footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})

/**
 * Класс модуля футера сервиса.
 */
export class FooterModule implements OnInit {
    public readonly footerData$ = this.headerService.footerData$;
    public aFooter1Items: FooterItems[] = []; 
    public aFooter2Items: FooterItems[] = []; 
    public aFooter3Items: FooterItems[] = []; 
    public aFooter4Items: FooterItems[] = []; 
    public dateLine: string = "";

    constructor(private readonly roleService: RoleService,
        private headerService: FooterService) {

    };

    public async ngOnInit() {
        // Параллельно получает данные на ините страницы.   
        forkJoin([
            await this.getFooterItemsAsync()
        ]).subscribe();

        this.calcDateYear();
    };

    /**
     * Функция получит список элементов футера.
     * @returns - Список элементов футера.
     */
    private async getFooterItemsAsync() {
        (await this.headerService.getFooterItemsAsync())
            .subscribe(_ => {
                console.log("Данные футера: ", this.footerData$.value);

                let data = this.footerData$.value;

                // Распределит по столбцам в зависимости от его номера.
                data.forEach((item: FooterItems) => {
                    switch (item.footerColumnNumber) {
                        case 1:
                            this.aFooter1Items.push(item);
                            break;

                        case 2:
                            this.aFooter2Items.push(item);
                            break;

                        case 3:
                            this.aFooter3Items.push(item);
                            break;
                            
                        case 4:
                            this.aFooter4Items.push(item);
                            break;
                    }
                });

                // Сортирует массивы.
                this.aFooter1Items.sort((a, b) => (a.footerItemPosition > b.footerItemPosition) ? 1 : -1);
                this.aFooter2Items.sort((a, b) => (a.footerItemPosition > b.footerItemPosition) ? 1 : -1);
                this.aFooter3Items.sort((a, b) => (a.footerItemPosition > b.footerItemPosition) ? 1 : -1);
                this.aFooter4Items.sort((a, b) => (a.footerItemPosition > b.footerItemPosition) ? 1 : -1);

                console.log("aFooter1Items ", this.aFooter1Items);
                console.log("aFooter2Items ", this.aFooter2Items);
                console.log("aFooter3Items ", this.aFooter3Items);
                console.log("aFooter4Items ", this.aFooter4Items);
            });
    };

    private calcDateYear() {
        let startYear = 2022;
        let now = new Date().getFullYear();

        if (now == startYear) {
            this.dateLine += startYear;
        }

        else {
            this.dateLine += startYear + "-" + now;
        }
    };
}
