import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { ProfileService } from "../../services/profile.service";

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

    constructor(private _profileService: ProfileService) {

    };

    public async ngOnInit() {
        // Параллельно получает данные на ините страницы.   
        forkJoin([
            await this.getProfileMenuItemsAsync()
        ]).subscribe();
    };

    // /**
  //  * Функция получит данные списка меню хидера.
    //  * @returns - Данные блока.
    //  */
    private async getProfileMenuItemsAsync() {
        (await this._profileService.getProfileMenuItemsAsync()).subscribe(_ => {
            console.log("profileLeftMenuItems",this.userProfileMenuItems$.value.profileLeftMenuItems);
        });
    };
}
