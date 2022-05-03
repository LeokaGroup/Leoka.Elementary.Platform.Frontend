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
    public about$ = new BehaviorSubject<any>({});
    public request$ = new BehaviorSubject<any>({});
    public mentor$ = new BehaviorSubject<any>({});
    public mainMentor$ = new BehaviorSubject<any>({});

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
     * @typeRole - Тип роли.
     * @returns - Данные блока.
     */
    public async getReceptionAsync(typeRole: number) {
        return await this.http.get(API_URL.apiUrl + "/main/reception?typeRole=" + typeRole).pipe(
            tap(data => this.reception$.next(data))
        );
    };

    /**
     * Функция получит данные для блока с чего начать.
       * @typeRole - Тип роли.
     * @returns - Данные блока.
     */
    public async getBeginAsync(typeRole: number) {
        return await this.http.get(API_URL.apiUrl + "/main/begin?typeRole=" + typeRole).pipe(
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
     public async getSmartClassAsync(typeRole: number) {
        return await this.http.get(API_URL.apiUrl + "/main/smart-class?typeRole=" + typeRole).pipe(
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

    /**
     * Функция получит данные о платформе.
     * @returns - Данные блока.
     */
    public async getAboutAsync() {
        return await this.http.get(API_URL.apiUrl + "/main/about").pipe(
            tap(data => this.about$.next(data))
        );
    };

    /**
     * Функция получит данные для блока заявки.
     * @returns - Данные блока.
     */
    public async getRequestAsync() {
        return await this.http.get(API_URL.apiUrl + "/main/request").pipe(
            tap(data => this.request$.next(data))
        );
    };

    /**
     * Функция получит данные блока преподавателя.
     * @returns - Данные блока.
     */
    public async getMentorAsync() {
        return await this.http.get(API_URL.apiUrl + "/main/for-mentor").pipe(
            tap(data => this.mentor$.next(data))
        );
    };

    /**
     * Функция получит данные для блока преподавателя на главной странице преподавателя.
     * @returns - Данные для блока.
     */
    public async getMainMentorAsync() {
        return await this.http.get(API_URL.apiUrl + "/main/mentor").pipe(
            tap(data => this.mainMentor$.next(data))
        );
    };
}