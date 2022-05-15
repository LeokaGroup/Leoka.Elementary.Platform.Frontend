import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { ProfileStartService } from "../services/profile-start.service";

@Component({
    selector: "profile-start",
    templateUrl: "./profile-start.component.html",
    styleUrls: ["./profile-start.component.scss"]
})

/**
 * Класс модуля Главной страницы преподавателя.
 */
export class ProfileStartModule implements OnInit {
    public readonly userProfileInfo$ = this._profileStartService.userProfileInfo$;

    constructor(private _profileStartService: ProfileStartService) {};

    public async ngOnInit() {     
        // Параллельно получает данные на ините страницы.   
        forkJoin([
            await this.getProfileInfoAsync()        
        ]).subscribe();
    };    

    /**
     * Функция получит данные блока преподавателя.
     * @returns - Данные блока.
     */
     private async getProfileInfoAsync() {
        (await this._profileStartService.getProfileInfoAsync())
        .subscribe(_ => {
            console.log("Данные о профиле: ", this.userProfileInfo$.value);
        });
    };
}
