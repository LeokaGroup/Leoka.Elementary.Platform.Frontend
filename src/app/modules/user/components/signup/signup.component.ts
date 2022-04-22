import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
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
    selectedRole: string = "";
    isAcceptRegulations: boolean = false;
    isNews: boolean = false;

    public readonly signupUser$ = this.userService.signupUser$;
    public readonly roles$ = this.roleService.roles$;

    constructor(private readonly userService: UserService,
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

    /**
     * Функция получит список ролей.
     * @returns - Список ролей.
     */
    private async getRolesAsync() {
        (await this.roleService.getRolesAsync())
            .subscribe(_ => {
                console.log("Список ролей", this.roles$.value);
            });
    };
}
