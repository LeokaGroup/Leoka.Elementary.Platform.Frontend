import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';
import { UserInput } from '../models/user-input';

@Injectable()
export class UserService {
    public readonly signupUser$ = new BehaviorSubject<any>(undefined);
    public readonly signinUser$ = new BehaviorSubject<any>(undefined);
    
    constructor(private readonly http: HttpClient) {

    }

     /**
      * Функция создаст нового пользователя.
      * @param firstName - Имя пользователя.
      * @param contactData - Email или номер телефона.
      * @param userPassword - Пароль.
      * @param userRole - Роль пользователя.
      * @returns - Данные пользователя.
      */
    public async signupUserAsync(firstName: string, contactData: string, userPassword: string, userRole: string) {
        let userInput = new UserInput();
        userInput.firstName = firstName;
        userInput.contactData = contactData;
        userInput.userPassword = userPassword;
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
                this.signinUser$.next(data);
            })
        );
    };
}