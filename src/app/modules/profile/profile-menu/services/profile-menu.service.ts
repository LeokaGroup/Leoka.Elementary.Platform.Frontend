import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Сервис меню профиля пользователя.
 */
@Injectable()
export class ProfileMenuService {
    constructor(private readonly http: HttpClient) {

    }
}