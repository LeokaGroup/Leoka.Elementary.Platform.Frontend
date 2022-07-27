import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';
import { ItemTemplate } from '../profile-lesson-template/models/shared/item-template';

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
     * Функция генерирует выбранный шаблон урока.
       * @param templateType - тип шаблона для генерации.
     * @returns - Xml-шаблон.
     */
    public async generateTemplateAsync(templateId: number) {
        const headers = new HttpHeaders({ 'Content-Type': 'text/xml' });
        headers.append('Accept', 'text/xml');
        headers.append('Content-Type', 'text/xml');
        return await this._http.get(API_URL.apiUrl + "/template/generate?templateId=" + templateId, {headers: headers}).pipe(
            tap((data: any) => {
                this.profileGeneratedTemplate$.next(data);
            })
        );
    };
}