import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';

/**
 * Общий сервис шаблонов уроков.
 */
@Injectable()
export class ProfileTemplatesService {
    public readonly profileItemTemplates$ = new BehaviorSubject<any>({});
    public readonly profileTemplates$ = new BehaviorSubject<any>({});
    public readonly profileGeneratedTemplate$ = new BehaviorSubject<any>({});

    constructor(private readonly _http: HttpClient) {

    }

    /**
     * Функция получит список шаблонов уроков.
     * @returns - Список элементов.
     */
    public async getProfileTemplatesAsync() {
        return await this._http.get(API_URL.apiUrl + "/template/items").pipe(
            tap((data: any) => {
                this.profileTemplates$.next(data);
            })
        );
    };

    /**
     * Функция получает шаблоны урока.
     * @param itemId - Id урока.
     * @returns - Шаблоны урока.
     */
    public async getSelectedItemTemplatesAsync(itemId: number) {
        return await this._http.get(API_URL.apiUrl + "/template/item-templates?idItemTemplate=" + itemId).pipe(
            tap((data: any) => {
                this.profileItemTemplates$.next(data);
            })
        );
    };

    /**
     * Функция получает выбранный шаблон урока.
       * @param templateId - Id шаблона.
     * @returns - json-шаблон.
     */
    public async getTemplateAsync(templateId: number) {
        return await this._http.get(API_URL.apiUrl + "/template/template?templateId=" + templateId).pipe(
            tap((data: any) => {
                this.profileGeneratedTemplate$.next(data);
            })
        );
    };
}