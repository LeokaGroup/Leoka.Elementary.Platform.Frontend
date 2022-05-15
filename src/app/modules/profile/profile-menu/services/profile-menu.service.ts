import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Сервис меню профиля пользователя.
 */
@Injectable()
export class ProfileMenuService {
    public readonly userProfileMenuItems$ = new BehaviorSubject<any>({});
    
    constructor(private readonly http: HttpClient) {

    }
}