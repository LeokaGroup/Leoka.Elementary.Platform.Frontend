import { Component, OnInit } from "@angular/core";
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
    constructor(private _profileStartService: ProfileStartService) {};

    public async ngOnInit() {     
        // Параллельно получает данные на ините страницы.   
        // forkJoin([
        //     await this.getMainMentorAsync()        
        // ]).subscribe();
    };    

    // /**
    //  * Функция получит данные блока преподавателя.
    //  * @returns - Данные блока.
    //  */
    //  private async getMainMentorAsync() {
    //     (await this.mainPageService.getMainMentorAsync())
    //     .subscribe(_ => {
    //         console.log("Преподавателя: ", this.mainMentor$.value);
    //     });
    // };
}
