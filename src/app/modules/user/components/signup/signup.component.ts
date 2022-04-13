import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { CommonDataService } from "src/app/modules/base/services/common.service";
import { RoleService } from "../../services/role.service";
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
    userPhoneNumber: string = "";
    userEmail: string = "";
    // userPassword: string = "";
    selectedRole: string = "";

    public readonly signupUser$ = this.userService.signupUser$;
    public readonly roles$ = this.roleService.roles$;

    constructor(private http: HttpClient,
        private readonly userService: UserService,
        private readonly roleService: RoleService) {

    };

    public async ngOnInit() {
        await this.getRolesAsync();
        
    };

    /**
     * Функция создаст нового пользователя.
     * @returns - Данные пользователя.
     */
    public async onSignUpAsync() {
        (await this.userService.signupUserAsync(this.firstName, this.userPhoneNumber, this.userEmail, this.selectedRole))
            .subscribe(response => {
                console.log(this.signupUser$.value);
            });
    };

    private async getRolesAsync() {
        (await this.roleService.getRolesAsync())
            .subscribe(response => {
                console.log("Список ролей", this.roles$.value);
            });
    };
}
