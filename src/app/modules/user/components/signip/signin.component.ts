import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
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
        private readonly userService: UserService) {

    };

    public async ngOnInit() {

    };

    /**
     * Функция авторизует пользователя.
     * @returns - Данные пользователя.
     */
    public onSignIn() {
        this.userService.signinUser(this.userLogin, this.userPassword)
            .subscribe(response => {
                console.log(this.signinUser$.value);
            });
    };
}
