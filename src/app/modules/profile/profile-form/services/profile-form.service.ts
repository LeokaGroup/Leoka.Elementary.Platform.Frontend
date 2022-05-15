import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';

/**
 * Сервис анкеты пользователя.
 */
@Injectable()
export class ProfileFormService {
    public readonly profileItems$ = new BehaviorSubject<any>([]);
    public readonly profileItemsDropdown$ = new BehaviorSubject<any>([]);
    public readonly profilePurposeDropdown$ = new BehaviorSubject<any>([]);
    
    constructor(private readonly http: HttpClient) {

    }

    /**
     * Функция получит список предметов.
     * @returns - Список предметов.
     */
     public async getProfileItemsAsync() {
        return await this.http.get(API_URL.apiUrl + "/profile/items").pipe(
            tap((data: any) => {
                this.profileItems$.next(data);
            })
        );
    };

    /**
     * Функция получит список для выпадающего списка длительностей уроков.
     * @returns - Список для выпадающего списка длительностей уроков.
     */
    public async getLessonsDurationAsync() {
        return await this.http.get(API_URL.apiUrl + "/profile/durations").pipe(
            tap((data: any) => {
                this.profileItemsDropdown$.next(data);
            })
        );
    };

    /**
     * Функция получит список целей подготовки.
     * @returns - Список целей подготовки.
     */
    public async getPurposeTrainingsAsync() {
        return await this.http.get(API_URL.apiUrl + "/profile/purposes").pipe(
            tap((data: any) => {
                this.profilePurposeDropdown$.next(data);
            })
        );
    };
}