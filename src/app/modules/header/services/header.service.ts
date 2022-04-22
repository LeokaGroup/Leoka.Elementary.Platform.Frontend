import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';

@Injectable()
export class HeaderService {
    public headerData$ = new BehaviorSubject<any>([]);

    constructor(private readonly http: HttpClient) {

    }

    public async getHeaderItemsAsync() {
        return await this.http.get(API_URL.apiUrl + "/main/header").pipe(
            tap(data => this.headerData$.next(data)
            )
        );
    };
}