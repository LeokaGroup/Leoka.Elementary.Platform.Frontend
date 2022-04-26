import { Component, OnInit } from "@angular/core";
import { RoleService } from "../../user/services/role.service";
import { HeaderService } from "../services/header.service";

@Component({
    selector: "header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

/**
 * Класс модуля хидера сервиса.
 */
export class HeaderModule implements OnInit {
    public readonly headerData$ = this.headerService.headerData$;

    constructor(private readonly roleService: RoleService,
        private headerService: HeaderService) {

        };

    public async ngOnInit() {        
        await this.roleService.refreshToken();
        await this.getHeaderItemsAsync();
    };    

     /**
     * Функция получит список элементов хидера.
     * @returns - Список элементов хидера.
     */
    private async getHeaderItemsAsync() {
        (await this.headerService.getHeaderItemsAsync())
        .subscribe(_ => {
            console.log("Данные хидера: ", this.headerData$.value);
        });
    };
}
