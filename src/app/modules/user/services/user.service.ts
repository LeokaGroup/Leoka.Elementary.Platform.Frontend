import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';
import { UserInput } from '../models/user-input';

@Injectable()
export class UserService {
    public readonly addUser$ = new BehaviorSubject<any>(undefined);

    constructor(private readonly http: HttpClient) {

    }

    public createUser(firstName: string, contactData: string, userPassword: string, userRole: string) {
        let userInput = new UserInput();
        userInput.firstName = firstName;
        userInput.contactData = contactData;
        userInput.userPassword = userPassword;
        userInput.userRole = userRole;

        return this.http.post(API_URL.apiUrl + "/user/signup", userInput).pipe(
            tap(data => this.addUser$.next(data))
        );
    };
}