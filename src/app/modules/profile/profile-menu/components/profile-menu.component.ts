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
    aProfileLeftMenuItems: any[] = [{}];

    constructor(private _profileService: ProfileService) {

    };

    public async ngOnInit() {
        // Параллельно получает данные на ините страницы.   
        forkJoin([
            await this.getProfileMenuItemsAsync()
        ]).subscribe();
    };

    // /**
    //  * Функция получит данные блока преподавателя.
    //  * @returns - Данные блока.
    //  */
    private async getProfileMenuItemsAsync() {
        (await this._profileService.getProfileMenuItemsAsync())
            .subscribe(_ => {
                console.log("Данные меню: ", this.userProfileMenuItems$.value);

                // Чистит массив, чтобы не было пустых объектов вначале.
                this.aProfileLeftMenuItems = [];

                // Наполнит массив элементами меню.
                this.userProfileMenuItems$.value.profileLeftMenuItems.forEach((item: any, ind: number) => {
                    this.aProfileLeftMenuItems.push({ label: item.profileItemTitle });
                });
            });
    };
}
