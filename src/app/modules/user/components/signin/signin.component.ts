import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
    selector: "signin",
    templateUrl: "./signin.component.html",
    styleUrls: ["./signin.component.scss"]
})

/**
 * Класс модуля авторизации пользователя.
 */
export class SignInModule implements OnInit {
    userLogin: string = "";
    userPassword: string = "";

    public readonly signinUser$ = this.userService.signinUser$;

    constructor(private http: HttpClient,
        private readonly userService: UserService,
        private _router: Router) {

    };

    public async ngOnInit() {

    };

    /**
     * Функция авторизует пользователя.
     * @returns - Данные пользователя.
     */
    public async onSignInAsync() {
        (await this.userService.signinUserAsync(this.userLogin, this.userPassword))
            .subscribe(_ => {
                console.log(this.signinUser$.value);
                this._router.navigate(["/profile/welcome"]);
            });
    };
}
