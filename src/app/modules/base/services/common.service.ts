import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-urls";

/**
 * Сервис общих функций.
 */
@Injectable()
export class CommonDataService {
    currentRoute: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute) {
            // this.currentRoute = this.route.snapshot.queryParams;
    }
};
