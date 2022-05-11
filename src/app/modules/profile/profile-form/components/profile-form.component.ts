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

    constructor(private _profileService: ProfileService) {};

    public async ngOnInit() {     
        // Параллельно получает данные на ините страницы.   
        forkJoin([
            await this.getProfileItemsAsync()
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
}
