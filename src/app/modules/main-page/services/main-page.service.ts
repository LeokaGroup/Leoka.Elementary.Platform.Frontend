import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';

@Injectable()
export class MainPageService {
    public mainFon$ = new BehaviorSubject<any>({});
    public reception$ = new BehaviorSubject<any>({});

    constructor(private readonly http: HttpClient) {

    }

    /**
     * Функция получит данные главного фона.
     * @returns - Данные блока фона.
     */
    public async getMainFonItemsAsync() {
        return await this.http.get(API_URL.apiUrl + "/main/fon").pipe(
            tap(data => this.mainFon$.next(data))
        );
    };

    public async getReceptionAsync() {
        return await this.http.get(API_URL.apiUrl + "/main/reception").pipe(
            tap(data => this.reception$.next(data))
        );
    };
}