import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { ProfileService } from "../../services/profile.service";

@Component({
    selector: "profile-form",
    templateUrl: "./profile-form.component.html",
    styleUrls: ["./profile-form.component.scss"]
})

/**
 * Класс модуля анкеты профиля пользователя.
 */
export class ProfileFormModule implements OnInit {
    public readonly profileItems$ = this._profileService.profileItems$;
    selectedItem: string = "";
    checkedContact: boolean = false;
    public readonly profileItemsDropdown$ = this._profileService.profileItemsDropdown$;

    constructor(private _profileService: ProfileService) {};

    public async ngOnInit() {     
        // Параллельно получает данные на ините страницы.   
        forkJoin([
            await this.getProfileItemsAsync(),
            await this.getLessonsDurationAsync()
        ]).subscribe();
    };    

    /**
     * Функция получит список предметов.
     * @returns - Список предметов.
     */
     private async getProfileItemsAsync() {
        (await this._profileService.getProfileItemsAsync())
        .subscribe(_ => {
            console.log("Список предметов: ", this.profileItems$.value);
        });
    };

    /**
     * Функция получит список предметов.
     * @returns - Список предметов.
     */
     private async getLessonsDurationAsync() {
        (await this._profileService.getLessonsDurationAsync())
        .subscribe(_ => {
            console.log("Длительность уроков: ", this.profileItemsDropdown$.value);
        });
    };
}
