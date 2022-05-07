import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';

/**
 * Сервис стартовой страницы профиля пользователя.
 */
@Injectable()
export class ProfileStartService {
    public readonly userProfileInfo$ = new BehaviorSubject<any>([]);
    
    constructor(private readonly http: HttpClient) {

    }

    /**
     * Функция получит данные с информацией о профиле пользователе.
     * @returns - Данные профиля пользователя.
     */
     public async getProfileInfoAsync() {
        return await this.http.get(API_URL.apiUrl + "/profile/info").pipe(
            tap((data: any) => {
                this.userProfileInfo$.next(data);
            })
        );
    };
}