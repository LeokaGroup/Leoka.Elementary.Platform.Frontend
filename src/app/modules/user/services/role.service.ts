import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';

@Injectable()
export class RoleService {
    public readonly roles$ = new BehaviorSubject<any>(undefined);

    constructor(private readonly http: HttpClient,
        private router: Router) {

    }

    /**
     * Функция получит список ролей.
     * @returns - Список ролей.
     */
    public async getRolesAsync() {
        return await this.http.get(API_URL.apiUrl + "/role/roles").pipe(
            tap(data => this.roles$.next(data))
        );
    };

     // Функция отсчитывает время бездействия юзера, по окончании простоя убивает сессию и перенаправляет на страницу авторизации.
     public deadlineSession(): void {
        var idleTime = 0;
        document.addEventListener("DOMContentLoaded", function(event) {
            //Increment the idle time counter every minute.
            var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

            //Zero the idle timer on mouse movement.
            // $(this).mousemove(function (e) {
            //     idleTime = 0;
            // });
            document.addEventListener('mousemove', e => {
                idleTime = 0;
            });

            document.addEventListener('keypress', e => {
                idleTime = 0;
            });

            // $(this).keypress(function (e) {
            //     idleTime = 0;
            // });
        });
        // $(document).ready(() => {
            
        // });

        const timerIncrement = () => {
            idleTime++;

            if (idleTime > 19) { // 20 minutes
                sessionStorage.clear();
                localStorage.clear();
                this.router.navigate(["/user/signin"]);
            }
        }
    };

    // Функция обновит токена пользователя.
    public async refreshToken(): Promise<void> {
        setInterval(async () => {
            if (!sessionStorage["token"]) {
                // clearInterval(intervalID);
                clearInterval();
                return;
            }

            try {
                await this.http.get(API_URL.apiUrl.concat("/role/token"))
                    .subscribe({
                        next: (response: any) => {
                            sessionStorage["token"] = response.token;
                            console.log("refresh token", response);
                        },

                        error: (err) => {
                            console.log(err);
                            console.log('Ошибка обновления токена');
                        }
                    });
            }

            catch (e: any) {
                throw new Error(e);
            }
        }, 530000); // Каждые 9 мин. 
    };  

    public routeToStart(err: any) {
        if (err.status === 401) {
           sessionStorage.clear();
            sessionStorage.clear();
            
            this.router.navigate(["/user/signin"]);
        }
    };
}