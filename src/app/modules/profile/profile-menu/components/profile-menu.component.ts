import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { CommonDataService } from "src/app/modules/base/services/common.service";
import { ProfileService } from "../../services/profile.service";
import { ProfileMenuInput } from "../models/input/profile-menu-input";

@Component({
    selector: "profile-menu",
    templateUrl: "./profile-menu.component.html",
    styleUrls: ["./profile-menu.component.scss"]
})

/**
 * Класс модуля меню профиля пользователя.
 */
export class ProfileMenuModule implements OnInit {
    public readonly userProfileMenuItems$ = this._profileService.userProfileMenuItems$;

    constructor(private _profileService: ProfileService,
        private _router: Router,
        private _commonService: CommonDataService) {

    };

    public async ngOnInit() {
        // Параллельно получает данные на ините страницы.   
        forkJoin([
            await this.getProfileMenuItemsAsync()
        ]).subscribe();
    };

    /**
     * Функция получит данные списка меню хидера.
     * @returns - Данные блока.
     */
    private async getProfileMenuItemsAsync() {
        (await this._profileService.getProfileMenuItemsAsync())
        .subscribe(
            (_) => {
                console.log("profileLeftMenuItems",this.userProfileMenuItems$.value.profileLeftMenuItems);
            },

            (err) => {
                this._commonService.routeToStart(err);
            }
        );
    };

    /**
     * Функция получит выбранный пункт меню профиля пользователя.
     * @param selectedItem - выбранный элемент меню.
     */
    public onSelectMenuItem(selectedItem: ProfileMenuInput) {
        console.log("selectedItem", selectedItem);

        switch (selectedItem.profileItemSysName) {
            // Вкладка анкеты.
            case "MyProfile":
                this._router.navigate(["/profile/form"]);
                break;

            // Вкладка создания шаблона урока.
            case "CreatePlanLesson":
                this._router.navigate(["/profile/template"]);
                break;
        }
    };
}
