import { Component, OnInit } from "@angular/core";
import { RoleService } from "../../user/services/role.service";
import { HeaderService } from "../services/header.service";
import { ActivatedRoute } from "@angular/router";

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

    isBlockMenuMain: boolean = true;
    isBlockMenuProfile: boolean = false;
    isProfile: boolean = false;

    constructor(private readonly roleService: RoleService,
        private headerService: HeaderService,
        private _route: ActivatedRoute) {
    };

    public async ngOnInit() {
        await this.roleService.refreshToken();
        await this.getHeaderItemsAsync();
        this.configureHeaderStyles();
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

    /**
     * Функция выставит стили для хидера.
     */
    private configureHeaderStyles(): void {
        this._route.queryParams.subscribe(
            (queryParam: any) => {
                this.isProfile = queryParam['profile'];

                // Если пользователь зашел в профиль, значит изменить стили для хидера.
                if (!!this.isProfile) {
                    this.isBlockMenuMain = false;
                    this.isBlockMenuProfile = true;
                }

                // Иначе использовать исходные стили хидера.
                else {
                    this.isBlockMenuMain = true;
                    this.isBlockMenuProfile = false;
                }

                console.log("profile", this.isProfile);
            }
        );
    };
}
