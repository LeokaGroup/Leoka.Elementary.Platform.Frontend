import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { LoadingService } from "src/app/modules/base/services/loading.service";

// Класс перехватчика api-запросов.
@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
    constructor(private loader: LoadingService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
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
            tap(_ => {
                this.loader.setBusy(false);
            }),

            catchError(response => {
                // this.commonService.routeToStart(err);
                this.loader.setBusy(false);

                return throwError(response.message);
            }));
    }
}
