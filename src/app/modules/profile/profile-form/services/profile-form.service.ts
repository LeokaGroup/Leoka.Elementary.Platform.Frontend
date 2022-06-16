import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from 'src/app/core/core-urls/api-urls';
import { SaveMentorProfileUserInfoInput } from '../models/input/save-mentor-profile-user-info-input';

/**
 * Сервис анкеты пользователя.
 */
@Injectable()
export class ProfileFormService {
    public readonly profileItems$ = new BehaviorSubject<any>([]);
    public readonly profileItemsDropdown$ = new BehaviorSubject<any>([]);
    public readonly profilePurposeDropdown$ = new BehaviorSubject<any>([]);
    public readonly formProfile$ = new BehaviorSubject<any>([]);
    public readonly profileDaysWeek$ = new BehaviorSubject<any>([]);
    public readonly profileCerts$ = new BehaviorSubject<any>([]);
    public readonly profileAvatar$ = new BehaviorSubject<any>([]);
    public readonly profileWorksheet$ = new BehaviorSubject<any>([]);
    
    constructor(private readonly http: HttpClient) {

    }

    /**
     * Функция получит список предметов.
     * @returns - Список предметов.
     */
     public async getProfileItemsAsync() {
        return await this.http.get(API_URL.apiUrl + "/profile/items").pipe(
            tap((data: any) => {
                this.profileItems$.next(data);
            })
        );
    };

    /**
     * Функция получит список для выпадающего списка длительностей уроков.
     * @returns - Список для выпадающего списка длительностей уроков.
     */
    public async getLessonsDurationAsync() {
        return await this.http.get(API_URL.apiUrl + "/profile/durations").pipe(
            tap((data: any) => {
                this.profileItemsDropdown$.next(data);
            })
        );
    };

    /**
     * Функция получит список целей подготовки.
     * @returns - Список целей подготовки.
     */
    public async getPurposeTrainingsAsync() {
        return await this.http.get(API_URL.apiUrl + "/profile/purposes").pipe(
            tap((data: any) => {
                this.profilePurposeDropdown$.next(data);
            })
        );
    };

    /**
     * Функция сохранит данные анкеты профиля пользователя.
     * @returns - Сохраненные данные.
     */
    public async saveProfileUserInfoAsync(formProfileInput: any) {
        return await this.http.post(API_URL.apiUrl + "/profile/profile-info", formProfileInput).pipe(
            tap((response: any) => {
                this.formProfile$.next(response);
            })
        );
    };

    /**
     * Функция получит список дней недели.
     * @returns - Список дней недели.
     */
    public async getDaysWeekAsync() {
        return await this.http.get(API_URL.apiUrl + "/profile/days-week").pipe(
            tap((response: any) => {
                this.profileDaysWeek$.next(response);
            })
        );
    };

    /**
     * Функция получит список сертификатов.
     * @returns - Список сертификатов.
     */
    public async getCertsAsync() {
        return await this.http.get(API_URL.apiUrl + "/document/profile/certs").pipe(
            tap((response: any) => {
                this.profileCerts$.next(response);
            })
        );
    };

    /**
     * Функция получит аватар пользователя.
     * @returns - Аватар пользователя.
     */
    public async getAvatarAsync() {
        return await this.http.get(API_URL.apiUrl + "/profile/avatar").pipe(
            tap((response: any) => {
                this.profileAvatar$.next(response);
            })
        );
    };

    /**
     * Функция получит данные анкеты пользователя.
     * @returns - Данные анкеты пользователя.
     */
    public async getProfileWorkSheetAsync() {
        return await this.http.get(API_URL.apiUrl + "/profile/worksheet").pipe(
            tap((response: any) => {
                this.profileWorksheet$.next(response);
            })
        );
    };

    /**
     * Функция изменит аватар пользователя.
     * @param avatar - Аватар пользователя.
     */
    public async changeAvatarAsync(avatar: FormData) {
        return await this.http.patch(API_URL.apiUrl + "/profile/avatar", avatar).pipe(
            tap((response: any) => {  
                this.profileAvatar$.next(response); 
            })
        );
    };

    /**
     * Функция изменит фио пользователя.
     * @returns - Новые фио.
     */
    public async changeFioAsync(formProfileInput: SaveMentorProfileUserInfoInput) {
        return await this.http.patch(API_URL.apiUrl + "/profile/fio", formProfileInput).pipe(
            tap((response: any) => {  
                this.formProfile$.next(response);
            })
        );
    };

    /**
     * Функция обновит контакты пользователя.
     * @param profileInput - Входная модель.
     * @returns Измененные данные.
     */
    public async saveContactsAsync(profileInput: SaveMentorProfileUserInfoInput) {
        return await this.http.patch(API_URL.apiUrl + "/profile/contacts", profileInput).pipe(
            tap((response: any) => {  
                this.profileWorksheet$.next(response);
            })
        );
    };

    /**
     * Функция обновит список предметов преподавателя.
     * @param mentorItems - Список предметов для обновления.
     * @returns - Обновленные предметы.
     */
    public async updateMentorItemsAsync(mentorItems: any) {
        let inputModel = new SaveMentorProfileUserInfoInput();
        inputModel.mentorItems = mentorItems;

        return await this.http.patch(API_URL.apiUrl + "/profile/mentor-items", inputModel).pipe(
            tap((response: any) => {              
                this.profileWorksheet$.next(response);
            })
        );
    };

    /**
     * Функция обновит список цен преподавателя.
     * @param mentorPrices - Список цен для обновления.
     * @returns - Обновленные цены.
     */
    public async updateMentorPricesAsync(mentorPrices: any) {
        let inputModel = new SaveMentorProfileUserInfoInput();
        inputModel.mentorPrices = mentorPrices;

        return await this.http.patch(API_URL.apiUrl + "/profile/mentor-prices", inputModel).pipe(
            tap((response: any) => {              
                this.profileWorksheet$.next(response);
            })
        );
    };

    /**
     * Функция изменит длительности преподавателя.
     * @param durations - Длительности преподавателя.
     */
    public async updateMentorDurationsAsync(mentorDurations: any) {
        let inputModel = new SaveMentorProfileUserInfoInput();
        inputModel.mentorDurations = mentorDurations;

        return await this.http.patch(API_URL.apiUrl + "/profile/mentor-durations", inputModel).pipe(
            tap((response: any) => {              
                this.profileWorksheet$.next(response);
            })
        );
    };

    /**
     * Функция изменит время преподавателя.
     * @param durations - Время преподавателя.
     */
    public async updateMentorTimesAsync(mentorTimes: any) {
        let inputModel = new SaveMentorProfileUserInfoInput();
        inputModel.mentorTimes = mentorTimes;

        return await this.http.patch(API_URL.apiUrl + "/profile/mentor-times", inputModel).pipe(
            tap((response: any) => {              
                this.profileWorksheet$.next(response);
            })
        );
    };

    /**
     * Функция изменит данные о преподавателе.
     * @param aboutInfos - Данные о преподавателе.
     */
     public async updateMentorAboutInfosAsync(mentorAboutInfos: any) {
        let inputModel = new SaveMentorProfileUserInfoInput();
        inputModel.mentorAboutInfo = mentorAboutInfos;

        return await this.http.patch(API_URL.apiUrl + "/profile/mentor-about", inputModel).pipe(
            tap((response: any) => {              
                this.profileWorksheet$.next(response);
            })
        );
    };

     /**
     * Функция изменит данные об образовании преподавателе.
     */
    public async updateMentorEducationsAsync(mentorEducations: any) {
        let inputModel = new SaveMentorProfileUserInfoInput();
        inputModel.mentorEducations = mentorEducations;

        return await this.http.patch(API_URL.apiUrl + "/profile/mentor-educations", inputModel).pipe(
            tap((response: any) => {              
                this.profileWorksheet$.next(response);
            })
        );
    };

    /**
     * Функция изменит данные об опыте преподавателе.
     */
     public async updateMentorExperienceAsync(mentorExperience: any) {
        let inputModel = new SaveMentorProfileUserInfoInput();
        inputModel.mentorExperience = mentorExperience;

        return await this.http.patch(API_URL.apiUrl + "/profile/mentor-experience", inputModel).pipe(
            tap((response: any) => {              
                this.profileWorksheet$.next(response);
            })
        );
    };
}