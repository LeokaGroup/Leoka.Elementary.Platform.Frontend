import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';

/**
 * Общий сервис профиля пользователя.
 */
@Injectable()
export class ProfileService {
    public readonly userProfileMenuItems$ = new BehaviorSubject<any>({});
    public readonly profileItems$ = new BehaviorSubject<any>([]);
    public readonly profileItemsDropdown$ = new BehaviorSubject<any>([]);
    
    constructor(private readonly http: HttpClient) {

    }

    /**
     * Функция получит список элементов для меню профиля пользователя.
     * @returns - Список элементов.
     */
    public async getProfileMenuItemsAsync() {
        return await this.http.get(API_URL.apiUrl + "/profile/menu").pipe(
            tap((data: any) => {
                this.userProfileMenuItems$.next(data);
            })
        );
    };
}