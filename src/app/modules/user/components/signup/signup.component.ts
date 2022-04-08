import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";

@Component({
    selector: "signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"]
})

/**
 * Класс модуля регистрации пользователя.
 */
export class SignUpModule implements OnInit {
    firstName: string = "";
    phoneNumber: string = "";
    userEmail: string = "";
    userPassword: string = "";
    userRole: string = "";
    contactData: string = "";

    public readonly addUser$ = this.userService.addUser$;

    constructor(private http: HttpClient,
        private readonly userService: UserService) {

    };

    public async ngOnInit() {

    };

    /**
     * Функция создаст нового пользователя.
     * @returns - Данные пользователя.
     */
    public onCreateUser() {
        this.userService.createUser(this.firstName, this.contactData, this.userPassword, this.userRole)
            .subscribe(response => {
                console.log(response)
            });
    };
}
