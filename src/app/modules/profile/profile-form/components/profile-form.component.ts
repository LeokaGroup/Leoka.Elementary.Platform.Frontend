import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { ProfileFormService } from "../services/profile-form.service";

@Component({
    selector: "profile-form",
    templateUrl: "./profile-form.component.html",
    styleUrls: ["./profile-form.component.scss"]
})

/**
 * Класс модуля анкеты профиля пользователя.
 */
export class ProfileFormModule implements OnInit {
    public readonly profileItems$ = this._profileFormService.profileItems$;
    public readonly profileItemsDropdown$ = this._profileFormService.profileItemsDropdown$;
    public readonly profilePurposeDropdown$ = this._profileFormService.profilePurposeDropdown$;

    selectedItem: string = "";
    checkedContact: boolean = false;

    constructor(private _profileFormService: ProfileFormService) {};

    public async ngOnInit() {     
        forkJoin([
            await this.getProfileItemsAsync(),
            await this.getLessonsDurationAsync(),
            await this.getPurposeTrainingsAsync(),
        ]).subscribe();
    };    

    /**
     * Функция получит список предметов.
     * @returns - Список предметов.
     */
     private async getProfileItemsAsync() {
        (await this._profileFormService.getProfileItemsAsync())
        .subscribe(_ => {
            console.log("Список предметов: ", this.profileItems$.value);
        });
    };

    /**
     * Функция получит список предметов.
     * @returns - Список предметов.
     */
     private async getLessonsDurationAsync() {
        (await this._profileFormService.getLessonsDurationAsync())
        .subscribe(_ => {
            console.log("Длительность уроков: ", this.profileItemsDropdown$.value);
        });
    };

     /**
     * Функция получит список целей подготовки.
     * @returns - Список целей подготовки.
     */
    private async getPurposeTrainingsAsync() {
        (await this._profileFormService.getPurposeTrainingsAsync())
        .subscribe(_ => {
            console.log("Список целей: ", this.profilePurposeDropdown$.value);
        });
    };
}
