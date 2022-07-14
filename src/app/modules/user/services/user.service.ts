import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, tap} from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';
import { UserInput } from '../models/input/user-input';

/**
 * Сервис пользователя.
 */
@Injectable()
export class UserService {
    public readonly signupUser$ = new BehaviorSubject<any>(null);
    public readonly signinUser$ = new BehaviorSubject<any>(null);
    public isUserSignIn = new BehaviorSubject<boolean>(true);

    constructor(private readonly http: HttpClient) {

    }

     /**
      * Функция создаст нового пользователя.
      * @param firstName - Имя пользователя.
      * @param userPhoneNumber - Номер телефона.
      * @param userEmail - Email.
      * @param userRole - Роль пользователя.
      * @returns - Данные пользователя.
      */
    public async signupUserAsync(firstName: string, userPhoneNumber: string, userEmail: string, userRole: string) {
        let userInput = new UserInput();
        userInput.firstName = firstName;
        userInput.userPhoneNumber = userPhoneNumber;
        userInput.userEmail = userEmail;
        userInput.userRole = userRole;

        return await this.http.post(API_URL.apiUrl + "/user/signup", userInput).pipe(
            tap(data => this.signupUser$.next(data))
        );
    };

    /**
     * Функция авторизует пользователя.
     * @param userLogin - Email или номер телефона.
     * @param userPassword - Пароль.
     * @returns - Данные пользователя.
     */
    public async signinUserAsync(userLogin: string, userPassword: string) {
        return await this.http.get(API_URL.apiUrl + "/user/signin?userLogin=" + userLogin + "&userPassword=" + userPassword).pipe(
            tap((data: any) => {
                sessionStorage["token"] = data.token;
                document.cookie = "user=" + data.user;
                this.signinUser$.next(data);
            })
        );
    };

    public isUserAuth(): boolean {
      return !sessionStorage.getItem('token');
    }
}
