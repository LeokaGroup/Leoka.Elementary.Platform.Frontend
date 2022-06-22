import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';

/**
 * Сервис ролей.
 */
@Injectable()
export class RoleService {
    public readonly roles$ = new BehaviorSubject<any>(null);

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
    //  public deadlineSession(): void {
    //     var idleTime = 0;
    //     document.addEventListener("DOMContentLoaded", function() {
    //         var _ = setInterval(timerIncrement, 530000); // если надо 1 minute, то 60000
    //         document.addEventListener('mousemove', _ => {
    //             idleTime = 0;
    //         });

    //         document.addEventListener('keypress', _ => {
    //             idleTime = 0;
    //         });
    //     });

    //     const timerIncrement = () => {
    //         idleTime++;

    //         if (idleTime > 19) { // 20 minutes
    //             sessionStorage.clear();
    //             localStorage.clear();
    //             this.router.navigate(["/user/signin"]);
    //         }
    //     }
    // };

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
                            console.log("error refresh token", err);
                        }
                    });
            }

            catch (e: any) {
                throw new Error(e);
            }
        }, 530000); // Каждые 9 мин. 
    };  
}