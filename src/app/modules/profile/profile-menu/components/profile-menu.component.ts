import { Component, OnInit } from "@angular/core";
import { ProfileMenuService } from "../services/profile-menu.service";

@Component({
    selector: "profile-menu",
    templateUrl: "./profile-menu.component.html",
    styleUrls: ["./profile-menu.component.scss"]
})

/**
 * Класс модуля меню профиля пользователя.
 */
export class ProfileMenuModule implements OnInit {
    items: any[];

    constructor(private _profileMenuService: ProfileMenuService) {
        this.items = [
            {
                label: 'File',
                items: [{
                        label: 'New', 
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {label: 'Project'},
                            {label: 'Other'},
                        ]
                    },
                    {label: 'Open'},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                    {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
                ]
            }
        ];
    };

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
