import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Сервис стартовой страницы профиля пользователя.
 */
@Injectable()
export class ProfileStartService {
    constructor(private readonly http: HttpClient) {

    }
}