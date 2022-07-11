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
    
    constructor(private readonly http: HttpClient) {

    }

    /**
     * Функция получит список шаблонов уроков.
     * @returns - Список элементов.
     */
    public async getProfileTemplatesAsync() {
        return await this.http.get(API_URL.apiUrl + "/template/items").pipe(
            tap((data: any) => {
                this.profileTemplates$.next(data);
            })
        );
    };

    public async getSelectedItemTemplatesAsync(itemId: number) {
        return await this.http.get(API_URL.apiUrl + "/template/item-templates?idItemTemplate=" + itemId).pipe(
            tap((data: any) => {
                this.profileItemTemplates$.next(data);
            })
        );
    };
}