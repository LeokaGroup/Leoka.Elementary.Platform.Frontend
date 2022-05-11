import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";

@Component({
    selector: "profile-form",
    templateUrl: "./profile-form.component.html",
    styleUrls: ["./profile-form.component.scss"]
})

/**
 * Класс модуля анкеты профиля пользователя.
 */
export class ProfileFormModule implements OnInit {
    constructor() {};

    public async ngOnInit() {     
        // Параллельно получает данные на ините страницы.   
        forkJoin([
                
        ]).subscribe();
    };    

    /**
     * Функция получит данные блока преподавателя.
     * @returns - Данные блока.
     */
    //  private async getProfileInfoAsync() {
    //     (await this._profileStartService.getProfileInfoAsync())
    //     .subscribe(_ => {
    //         console.log("Данные о профиле: ", this.userProfileInfo$.value);
    //     });
    // };
}
