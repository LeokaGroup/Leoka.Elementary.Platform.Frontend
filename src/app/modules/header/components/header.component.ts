import { Component, OnInit } from "@angular/core";
import { RoleService } from "../../user/services/role.service";
import { HeaderService } from "../services/header.service";
import { ProfileService } from "../../profile/services/profile.service";
import { NavigationStart, Router, Event as NavigationEvent, ActivatedRoute, NavigationEnd } from "@angular/router";

@Component({
    selector: "header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

/**
 * Класс модуля хидера сервиса.
 */
export class HeaderModule implements OnInit {
    public readonly headerData$ = this.headerService.headerData$;
    public readonly userProfileMenuItems$ = this._profileService.userProfileMenuItems$;
    profileHeaderMenuItems: any[] = [];
    profileDropdownMenuItems: any[] = [];

    isBlockMenuMain: boolean = true;
    isBlockMenuProfile: boolean = false;
    isProfile: boolean = false;
    isVisibleButtonsAuth: boolean = false;
    public currentRoute: string = "";
    isVisibleHeaderItems: boolean = false;
    isVisibleButtonsSignUp: boolean = false;

    constructor(private readonly roleService: RoleService,
        private headerService: HeaderService,
        private _route: ActivatedRoute,
        private _profileService: ProfileService,
        private _router: Router) {
            
    };

    public async ngOnInit() {
        await this.roleService.refreshToken();
        await this.getHeaderItemsAsync();
        this.configureHeaderStyles();
        await this.getProfileMenuItemsAsync();              
    };

    public ngAfterViewInit() {               
        this.checkRouteUrl();
        this.refreshHeaderMenuItems();
    };

    /**
    * Функция получит список элементов хидера.
    * @returns - Список элементов хидера.
    */
    private async getHeaderItemsAsync() {
        (await this.headerService.getHeaderItemsAsync())
            .subscribe(_ => {
                console.log("Данные хидера: ", this.headerData$.value);
            });
    };

    /**
     * Функция выставит стили для хидера.
     */
    private configureHeaderStyles(): void {
        this._router.events
            .subscribe((event: NavigationEvent) => {
                if (event instanceof NavigationEnd) {
                    console.log(event.url);

                    if (!!sessionStorage["token"]) {                       
                        this.isVisibleButtonsAuth = true;
                        this.isVisibleButtonsSignUp = true;
                    }

                    else {
                        this.isVisibleButtonsAuth = false;
                        this.isVisibleButtonsSignUp = false;
                    }                                     

                    if (event.url == '/profile/welcome'
                        || event.url == "/profile/form"
                        || event.url == "/profile/template") {
                        this.isBlockMenuMain = false;
                        this.isBlockMenuProfile = true;
                    }

                    else {
                        this.isBlockMenuMain = true;
                        this.isBlockMenuProfile = false;
                    }
                }
            });
    };

    
    // /**
    //  * Функция получит данные списка меню хидера.
    //  * @returns - Данные блока.
    //  */
    private async getProfileMenuItemsAsync() {
        this.profileHeaderMenuItems = [];
        this.profileDropdownMenuItems = [];
        
        (await this._profileService.getProfileMenuItemsAsync())
            .subscribe(_ => {
                // Наполнит массив элементами меню.
                if (this.profileHeaderMenuItems.length == 0) {
                    this.userProfileMenuItems$.value.profileHeaderMenuItems.forEach((item: any) => {
                        this.profileHeaderMenuItems.push(item);
                    });

                    // Наполнит массив элементами выпадающего меню.
                    this.userProfileMenuItems$.value.profileDropdownMenuItems.forEach((item: any) => {
                        this.profileDropdownMenuItems.push(item);
                    });
                }               
            
                console.log("profileHeaderMenuItems", this.profileHeaderMenuItems);
                console.log("profileDropdownMenuItems", this.profileDropdownMenuItems);
            });
    };

    private checkRouteUrl() {
        this._router.events
            .subscribe((event: NavigationEvent) => {
                if (event instanceof NavigationStart) {
                    console.log(event.url);               
                    if (event.url == '/profile/welcome'
                        || event.url == "/profile/form"
                        || event.url == "/profile/template") {
                        this.isVisibleHeaderItems = true;
                    }      
                    
                    else {
                        this.isVisibleHeaderItems = false;
                    }
                }
            });
    };

    private refreshHeaderMenuItems() {
        this._route.queryParams.subscribe(
            async (queryParam: any) => {
                this.isProfile = queryParam['profile'];

                if (!!this.isProfile) {
                    this.profileHeaderMenuItems = [];
                    await this.getProfileMenuItemsAsync();
                }
            }
        );
    };   
}
