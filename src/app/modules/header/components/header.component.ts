import { Component, OnInit } from "@angular/core";
import { RoleService } from "../../user/services/role.service";
import { HeaderService } from "../services/header.service";
import { ActivatedRoute } from "@angular/router";
import { ProfileService } from "../../profile/services/profile.service";

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
    public readonly userProfileMenuItems$ = this._profileService.userProfileMenuItems$;
    profileHeaderMenuItems: any[] = [];
    profileDropdownMenuItems: any[] = [];

    isBlockMenuMain: boolean = true;
    isBlockMenuProfile: boolean = false;
    isProfile: boolean = false;
    isVisibleButtonsAuth: boolean = false;

    constructor(private readonly roleService: RoleService,
        private headerService: HeaderService,
        private _route: ActivatedRoute,
        private _profileService: ProfileService) {

    };

    public async ngOnInit() {
        await this.roleService.refreshToken();
        await this.getHeaderItemsAsync();
        this.configureHeaderStyles();
        await this.getProfileMenuItemsAsync();
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

    
    // /**
    //  * Функция получит данные списка меню хидера.
    //  * @returns - Данные блока.
    //  */
    private async getProfileMenuItemsAsync() {
        (await this._profileService.getProfileMenuItemsAsync())
            .subscribe(_ => {
                // Наполнит массив элементами меню.
                this.userProfileMenuItems$.value.profileHeaderMenuItems.forEach((item: any) => {
                    this.profileHeaderMenuItems.push(item);
                });

                // Наполнит массив элементами выпадающего меню.
                this.userProfileMenuItems$.value.profileDropdownMenuItems.forEach((item: any) => {
                    this.profileDropdownMenuItems.push(item);
                });

                console.log("profileHeaderMenuItems", this.profileHeaderMenuItems);
                console.log(this.userProfileMenuItems$.value.profileHeaderMenuItems);
                console.log("Все меню: ",this.userProfileMenuItems$.value);
                console.log("Выпадающее меню: ",this.profileDropdownMenuItems);
            });
    };
}
