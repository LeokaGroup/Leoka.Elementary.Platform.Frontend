import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { catchError, finalize, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { NetworkService } from "src/app/modules/base/services/network.service";

// Класс перехватчика api-запросов.
@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
    constructor(private loader: NetworkService) {

    }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        req = req.clone({
            headers: req.headers.set(
                "Authorization", "Bearer " + sessionStorage["token"]
            ),

            // Если нужно отправлять куки с каждым запросом.
            withCredentials: true
        });

        // req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        // req = req.clone({ headers: req.headers.set('Accept', 'multipart/form-data') });
        // req = req.clone({ headers: req.headers.set('Content-Type', 'multipart/form-data') });
        // req = req.clone({ headers: req.headers.set('Content-Type', 'multipart/form-data;boundary="boundary"') });

        this.loader.setBusy(true);

        return next.handle(req).pipe(
            tap(_ => { }),

            catchError(response => {
                // this.commonService.routeToStart(err);

                return throwError(response.message);
            }),

            finalize(() => {
                this.loader.setBusy(false);
            }));
    }
}
