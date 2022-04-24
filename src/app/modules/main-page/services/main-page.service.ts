import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';

/**
 * Сервис главной страницы.
 */
@Injectable()
export class MainPageService {
    public mainFon$ = new BehaviorSubject<any>({});
    public reception$ = new BehaviorSubject<any>({});
    public begin$ = new BehaviorSubject<any>({});
    public best$ = new BehaviorSubject<any>([]);
    public smartClass$ = new BehaviorSubject<any>({});
    public options$ = new BehaviorSubject<any>({});

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

    /**
     * Функция получит данные для блока записи на бесплатный урок.
     * @returns - Данные блока.
     */
    public async getReceptionAsync() {
        return await this.http.get(API_URL.apiUrl + "/main/reception").pipe(
            tap(data => this.reception$.next(data))
        );
    };

    /**
     * Функция получит данные для блока с чего начать.
     * @returns - Данные блока.
     */
    public async getBeginAsync() {
        return await this.http.get(API_URL.apiUrl + "/main/begin").pipe(
            tap(data => this.begin$.next(data))
        );
    };

    /**
     * Функция получит список вопросов.
     * @returns - Список вопросов с вариантами ответов.
     */
    public async getBestAsync() {
        return await this.http.get(API_URL.apiUrl + "/main/questions").pipe(
            tap(data => this.best$.next(data))
        );
    };

    /**
     * Функция получит данные для блоа умного класса.
     * @returns - Данные для блока.
     */
     public async getSmartClassAsync() {
        return await this.http.get(API_URL.apiUrl + "/main/smart-class").pipe(
            tap(data => this.smartClass$.next(data))
        );
    };

    /**
     * Функция получит данные для списка вопросов.
     * @returns - Данные для списка.
     */
    public async getOptionsAsync() {
        return await this.http.get(API_URL.apiUrl + "/main/options").pipe(
            tap(data => this.options$.next(data))
        );
    };
}