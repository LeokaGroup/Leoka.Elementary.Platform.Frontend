import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { forkJoin } from "rxjs";
import { DisplayMentorTimes } from "../models/display-mentor-times";
import { MentorProfileItem } from "../models/input/mentor-profile-item-input";
import { SaveMentorProfileUserInfoInput } from "../models/input/save-mentor-profile-user-info-input";
import { MentorAboutInfo } from "../models/mentor-about-into";
import { MentorDayWeek } from "../models/mentor-day-week";
import { MentorDurations } from "../models/mentor-durations";
import { MentorEducations } from "../models/mentor-educations";
import { MentorExperience } from "../models/mentor-experience";
import { MentorProfilePrices } from "../models/mentor-prices";
import { MentorProfileItems } from "../models/mentor-profile-items";
import { MentorTimes } from "../models/mentor-times";
import { MentorTrainings } from "../models/mentor-trainings";
import { ProfileFormService } from "../services/profile-form.service";

@Component({
    selector: "profile-form",
    templateUrl: "./profile-form.component.html",
    styleUrls: ["./profile-form.component.scss"]
})

/**
 * Класс модуля профиля пользователя.
 */
export class ProfileFormModule implements OnInit {
    public readonly profileItems$ = this._profileFormService.profileItems$;
    public readonly profileItemsDropdown$ = this._profileFormService.profileItemsDropdown$;
    public readonly profilePurposeDropdown$ = this._profileFormService.profilePurposeDropdown$;
    public readonly formProfile$ = this._profileFormService.formProfile$;
    public readonly profileDaysWeek$ = this._profileFormService.profileDaysWeek$;
    public readonly profileCerts$ = this._profileFormService.profileCerts$;
    public readonly profileAvatar$ = this._profileFormService.profileAvatar$;
    public readonly profileWorksheet$ = this._profileFormService.profileWorksheet$; 

    checkedContact: boolean = false;
    selectedPurposes: MentorTrainings[] = [];
    profileFormInput: SaveMentorProfileUserInfoInput = new SaveMentorProfileUserInfoInput();
    mentorProfileItems: MentorProfileItems[]  = [];
    mentorPrices: MentorProfilePrices[] = [];
    selectedItem: MentorProfileItem = new MentorProfileItem();
    displaySelectedMentorProfileItems: MentorProfileItem[] = [];
    displayMentorPrices: MentorProfilePrices[] = [];
    selectedPrice: any;
    selectedDuration: any;
    displayMentorDurations: MentorDurations[] = [];
    mentorTimes: MentorTimes[] = [];
    displayMentorTimes: DisplayMentorTimes[] = [];
    selectedMentorTimeStart: string = "";
    selectedMentorTimeEnd: string = "";
    selectedMentorDayWeek: MentorDayWeek = new MentorDayWeek();
    aboutInfo: string = "";
    mentorAboutInfo: MentorAboutInfo[] = [];
    education: string = "";
    mentorEducations: MentorEducations[] = [];
    experience: string = "";
    mentorExperience: MentorExperience[] = [];
    mentorDurations: MentorDurations[] = [];
    certsFiles: any[] = [];
    avatarNoPhoto: string = "";
    avatarImage: any;
    isNoPhoto: boolean = false;
    isEdit: boolean = false;
    userFio: string = "";
    isEditAvatar: boolean = false;
    isEditFio: boolean = false;
    isEditContact: boolean = false;
    isEditItemRow: boolean = false;
    isEditItem: boolean = false;
    isEditPriceRow: boolean = false;
    isEditDuration: boolean = false;
    isSelectedTrainings: boolean = false;
    isEditTime: boolean = false;
    isEditAboutInfo: boolean = false;
    isEditEducations: boolean = false;
    isEditExperience: boolean = false;
    isEditCerts: boolean = false;
    userRole: number = -2;  // -2, потому что есть -1 и 0. И по дефолту ставим то, чего нет.

    // Форма анкеты.
    profileForm: FormGroup = new FormGroup({
        "avatar": new FormControl(new FormData(), Validators.required),
        "fio": new FormControl("", Validators.required),
        "checkedContact": new FormControl(false),
        "phoneNumber": new FormControl("", Validators.required),
        "email": new FormControl("", Validators.required),
        "selectedItem": new FormControl("", Validators.required),
        "price": new FormControl("", Validators.required),
        "selectedDuration": new FormControl("", Validators.required),
        "education": new FormControl("", Validators.required),
        "experience": new FormControl("", Validators.required),
        "certs": new FormControl(new FormData(), Validators.required),
        "dayWeekName": new FormControl("", Validators.required),
        "mentorTimeStart": new FormControl("", Validators.required),
        "mentorTimeEnd": new FormControl("", Validators.required),
        "aboutInfo": new FormControl("", Validators.required)
    });

    constructor(private _profileFormService: ProfileFormService, private _sanitizer: DomSanitizer) {};

    public async ngOnInit() {     
        forkJoin([
            await this.getProfileItemsAsync(),
            await this.getLessonsDurationAsync(),
            await this.getPurposeTrainingsAsync(),
            await this.getDaysWeekAsync(),
            await this.getCertsAsync(),
            await this.getAvatarAsync(),
            await this.getProfileWorkSheetAsync()
        ]);
    };    

    /**
     * Функция получит список предметов.
     * @returns - Список предметов.
     */
     private async getProfileItemsAsync() {
        (await this._profileFormService.getProfileItemsAsync())
        .subscribe(_ => {
            console.log("Список предметов: ", this.profileItems$.value);
        });
    };

    /**
     * Функция получит список предметов.
     * @returns - Список предметов.
     */
     private async getLessonsDurationAsync() {
        (await this._profileFormService.getLessonsDurationAsync())
        .subscribe(_ => {
            console.log("Длительность уроков: ", this.profileItemsDropdown$.value);
        });
    };

     /**
     * Функция получит список целей подготовки.
     * @returns - Список целей подготовки.
     */
    private async getPurposeTrainingsAsync() {
        (await this._profileFormService.getPurposeTrainingsAsync())
        .subscribe(_ => {
            console.log("Список целей: ", this.profilePurposeDropdown$.value);
        });
    };

    /**
     * Функция сохранит данные анкеты профиля пользователя.
     * @returns - Сохраненные данные.
     */
    public async onSaveProfileUserInfoAsync() {
        console.log("profileForm", this.profileForm);

        this.profileFormInput.firstName = this.profileForm.controls["fio"].value.split(" ")[0];       
        this.profileFormInput.lastName = this.profileForm.controls["fio"].value.split(" ")[1];    
        this.profileFormInput.secondName = this.profileForm.controls["fio"].value.split(" ")[2];  
        this.profileFormInput.phoneNumber = this.profileForm.controls["phoneNumber"].value;
        this.profileFormInput.email = this.profileForm.controls["email"].value;
        this.profileFormInput.isVisibleAllContact = this.profileForm.controls["checkedContact"].value;
        this.profileFormInput.mentorItems = this.mentorProfileItems;

        if (!this.mentorPrices.length) {
            let price = new MentorProfilePrices();
            price.price = this.profileForm.controls["price"].value;
            price.unit = " руб.";
            this.mentorPrices.push(price);
        }

        this.profileFormInput.mentorPrices = this.mentorPrices;
        this.profileFormInput.mentorTimes = this.mentorTimes;
        this.profileFormInput.mentorTrainings = this.selectedPurposes;

        if (!this.mentorAboutInfo.length) {
            let about = new MentorAboutInfo();
            about.aboutInfoText = this.profileForm.controls["aboutInfo"].value;
            this.mentorAboutInfo.push(about);
        }

        if (!this.mentorEducations.length) {
            let education = new MentorEducations();
            education.educationText = this.profileForm.controls["education"].value;
            this.mentorEducations.push(education);
        }

        if (!this.mentorExperience.length) {
            let experience = new MentorExperience();
            experience.experienceText = this.profileForm.controls["experience"].value;
            this.mentorExperience.push(experience);
        }

        if (!this.mentorDurations.length) {
            let duration = new MentorDurations();
            duration.time = this.selectedDuration.time;
            duration.unit = " минут";
        }

        this.profileFormInput.mentorAboutInfo = this.mentorAboutInfo;
        this.profileFormInput.mentorEducations = this.mentorEducations;
        this.profileFormInput.mentorExperience = this.mentorExperience;
        this.profileFormInput.mentorDurations = this.mentorDurations;

        console.log("profileFormInput",this.profileFormInput);

        let formData = new FormData();
        formData.append("profileData", JSON.stringify(this.profileFormInput));
        formData.append("mentorCertificates", this.profileForm.controls["certs"].value.get("certs"));
        formData.append("profileImage", this.profileForm.controls["avatar"].value.get("avatar"));        

        (await this._profileFormService.saveProfileUserInfoAsync(formData))
        .subscribe(_ => {
            console.log("Данные анкеты: ", this.formProfile$.value);
        });
    };

    /**
     * Функция добавит файл изображения профиля.
     * @param e - Файл.
     */
    public onUploadAvatar(e: any) {
        console.log("onUploadAvatar", e);   

        this.profileForm.controls["avatar"].value.append("avatar", e.currentFiles[0]);

        console.log("avatar", this.profileForm.controls["avatar"].value.get("avatar"));         
    };

    /**
     * Функция добавит файлы сертификатов.
     * @param e - Файлы сертификатов.
     */
    public onUploadCerts(e: any) {
        console.log("onUploadCerts", e);

        this.profileForm.controls["certs"].value.append("certs", e.currentFiles[0]);
        
        console.log("cert", this.profileForm.controls["certs"].value.get("certs"));    
    };

    /**
     * Функция запишет цель подготовки.
     * @param purpose - Системное название цели подготовки.
     */
    public onSelectPurposes(purpose: string) {
        console.log("onSelectPurpose", purpose);

        let training = new MentorTrainings();
        training.trainingSysName = purpose;
        this.selectedPurposes.push(training);
        
        console.log("selectedPurposes", this.selectedPurposes);
    };

    /**
     * Функция запишет список предметов.
     */
    public addMentorProfileItems() {
        console.log("addMentorProfileItems", this.selectedItem);

        let profileItem = new MentorProfileItems();
        profileItem.itemSysName = this.selectedItem.itemSysName;
        this.mentorProfileItems.push(profileItem);

        // Добавит добавленный предмет в список для вывода пользователю.
        this.displaySelectedMentorProfileItems.push(this.selectedItem);

        this.mentorProfileItems = [...new Set(this.mentorProfileItems)];
        this.displaySelectedMentorProfileItems = [...new Set(this.displaySelectedMentorProfileItems)];

        console.log("mentorProfileItems", this.mentorProfileItems);
        console.log("displaySelectedMentorProfileItems", this.displaySelectedMentorProfileItems);
    };

    /**
     * Функция запишет цены преподавателя.
     */
    public addMentorPrices() {  
        console.log("addMentorPrices", this.selectedPrice);
        let price = new MentorProfilePrices();
        price.price = this.selectedPrice;
        price.unit = " руб.";

        // Добавит цены преподавателя для вывода пользователю.
        this.displayMentorPrices.push(price);
        this.mentorPrices.push(price);

         // Удалит дубликаты.
         this.mentorPrices = [...new Set(this.mentorPrices)];

        console.log("displayMentorPrices", this.displayMentorPrices);
        console.log("mentorPrices", this.mentorPrices);
    };

    public addMentorDurations() {
        console.log("addMentorDurations", this.selectedDuration);

        // Добавит цены преподавателя для вывода пользователю.
        this.displayMentorDurations.push(this.selectedDuration);
        
        let duration = new MentorDurations();
        duration.time = this.selectedDuration.time;
        duration.unit = " минут";

        this.mentorDurations.push(duration);

        // Удалит дубликаты.
        this.displayMentorDurations = [...new Set(this.displayMentorDurations)];
        this.mentorDurations = [...new Set(this.mentorDurations)];

        console.log("displayMentorDurations", this.displayMentorDurations);
        console.log("mentorDurations", this.mentorDurations);
    };

    /**
     * Функция получит список дней недели.
     * @returns - Список дней недели.
     */
    private async getDaysWeekAsync() {
        (await this._profileFormService.getDaysWeekAsync())
        .subscribe(_ => {
            console.log("Список дней недели: ", this.profileDaysWeek$.value);
        });
    };

    /**
     * Функция запишет время и день недели.
     */
    public addMentorDayTimes() {
        console.log("selectedMentorTimeStart",this.selectedMentorTimeStart);
        console.log("selectedMentorTimeEnd",this.selectedMentorTimeEnd);
        console.log("selectedMentorDayWeek",this.selectedMentorDayWeek.daySysName);

        let mentorTime = new MentorTimes();
        mentorTime.timeStart = this.selectedMentorTimeStart;
        mentorTime.timeEnd = this.selectedMentorTimeEnd;
        mentorTime.daySysName = this.selectedMentorDayWeek.daySysName;

        let displayMentorTimes = new DisplayMentorTimes();
        displayMentorTimes.timeStart = this.selectedMentorTimeStart;
        displayMentorTimes.timeEnd = this.selectedMentorTimeEnd;
        displayMentorTimes.day = this.selectedMentorDayWeek.dayName;

        this.mentorTimes.push(mentorTime);
        this.displayMentorTimes.push(displayMentorTimes);

        // Удалит дубликаты.
        this.displayMentorTimes = [...new Set(this.displayMentorTimes)];
        this.mentorTimes = [...new Set(this.mentorTimes)];

        console.log("displayMentorTimes", this.displayMentorTimes);
    };

    /**
     * Функция запишет информацию о преподавателе.
     */
    public addMentorAboutInfo() {
        let about = new MentorAboutInfo();
        about.aboutInfoText = this.aboutInfo;
        this.mentorAboutInfo.push(about);
        this.mentorAboutInfo = [...new Set(this.mentorAboutInfo)];
    };

    /**
     * Функция запишет образование преподавателя.
     */
    public addMentorEducation() {
        let education = new MentorEducations();
        education.educationText = this.education;
        this.mentorEducations.push(education);
        this.mentorEducations = [...new Set(this.mentorEducations)];
    };

    /**
     * Функция запишет опыт преподавателя.
     */
    public addMentorExperience() {
        let mentorExperience = new MentorExperience();
        mentorExperience.experienceText = this.experience;
        this.mentorExperience = [...new Set(this.mentorExperience)];
        this.mentorExperience.push(mentorExperience);
    };

    /**
     * Функция получит список сертификатов.
     * @returns - Список сертификатов.
     */
    private async getCertsAsync() {
        (await this._profileFormService.getCertsAsync())
            .subscribe(response => {
                console.log("Список сертификатов: ", this.profileCerts$.value);

                // Преобразует массив байтов в изображение.
                response.forEach((item: any) => {
                    let img = this._sanitizer.bypassSecurityTrustResourceUrl("data:image/"
                        + item.extension
                        + ";base64,"
                        + item.cert.fileContents);
                    this.certsFiles.push(img);
                });
            });
    };

    /**
     * Функция получит аватар пользователя.
     * @returns - Аватар пользователя.
     */
    private async getAvatarAsync() {
        (await this._profileFormService.getAvatarAsync())
            .subscribe(response => {
                console.log("Аватар: ", this.profileAvatar$.value);
                this.isNoPhoto = response.isNoPhoto;

                // Если нет аватара, то будет по дефолту.
                if (response.isNoPhoto) {
                    this.avatarNoPhoto = response.avatarUrl;
                }

                // Преобразует массив байтов в изображение.
                else {
                    let img = this._sanitizer.bypassSecurityTrustResourceUrl("data:image/"
                        + response.extension
                        + ";base64,"
                        + response.avatar.fileContents);
                    this.avatarImage = img;
                }
            });
    };

    /**
     * Функция получит данные анкеты пользователя.
     * @returns - Данные анкеты пользователя.
     */
    private async getProfileWorkSheetAsync() {
        (await this._profileFormService.getProfileWorkSheetAsync())
            .subscribe(response => {
                console.log("Данные анкеты: ", this.profileWorksheet$.value);
                this.userFio = response.firstName + " " + response.lastName + " " + response.secondName;
                this.userRole = response.userRole;
            });
    };

    public onChangeAvatarState() {
        this.isEditAvatar = true;
    };

    /**
     * Функция изменит аватар пользователя.
     * @returns - Новый аватар.
     */
    public async onChangeAvatarAsync() {
        console.log(this.profileForm.controls["avatar"].value.get("avatar"));
        let formData = new FormData();
        formData.append("avatar", this.profileForm.controls["avatar"].value.get("avatar"));

        (await this._profileFormService.changeAvatarAsync(formData))
            .subscribe(response => {
                console.log("Аватар изменен ок:");
                
                let img = this._sanitizer.bypassSecurityTrustResourceUrl("data:image/"
                        + response.extension
                        + ";base64,"
                        + response.avatar.fileContents);
                    this.avatarImage = img;
                    this.isEditFio = false;
            });
    };

    public onChangeFioState() {
        this.isEditFio = true;
    };

    /**
     * Функция изменит фио пользователя.
     * @returns - Новые фио.
     */
    public async onChangeFioAsync() {
        this.profileFormInput.firstName = this.profileForm.controls["fio"].value.split(" ")[0];       
        this.profileFormInput.lastName = this.profileForm.controls["fio"].value.split(" ")[1];    
        this.profileFormInput.secondName = this.profileForm.controls["fio"].value.split(" ")[2];  

        (await this._profileFormService.changeFioAsync(this.profileFormInput))
            .subscribe(response => {
                console.log("Новые фио: ", response);   
                this.userFio = response.firstName + " " + response.lastName + " " + response.secondName;
                this.isEditFio = false;
            });
    };

    public onChangeStateContacts() {
        this.isEditContact = true;
    };

    /**
     * Функция обновит контакты пользователя.
     * @param profileInput - Входная модель.
     * @returns Измененные данные.
     */
    public async onSaveContactsAsync() {
        this.profileFormInput.phoneNumber = this.profileForm.controls["phoneNumber"].value;
        this.profileFormInput.email = this.profileForm.controls["email"].value;
        this.profileFormInput.isVisibleAllContact = this.profileForm.controls["checkedContact"].value;

        (await this._profileFormService.saveContactsAsync(this.profileFormInput))
            .subscribe(response => {
                console.log("Новые контакты: ", response);
                this.profileWorksheet$.value.email = response.email;
                this.profileWorksheet$.value.phoneNumber = response.phoneNumber;
                this.profileWorksheet$.value.isVisibleAllContact = response.isVisibleAllContact;
                this.isEditContact = false;
            });
    };

    public onEditItems() {
        this.isEditItemRow = true;
    };

    /**
     * Функция обновит список предметов преподавателя.
     * @param mentorItems - Список предметов для обновления.
     * @returns - Обновленные предметы.
     */
    public async onUpdateItemsAsync(mentorItems: any) {
        this.isEditItemRow = true;
        let items: any = [];

        // TODO: хорошо бы это отрефакторить, чтобы убрать такое поведение с object.
        mentorItems.forEach((item: any) => {
            if (typeof(item.itemName) === "object") {
                items.push({
                    itemName: item.itemName.itemName,
                    itemNumber: item.itemName.itemNumber,
                    itemSysName: item.itemName.itemSysName,
                    profileItemId: item.itemName.profileItemId,
                    position: item.itemName.position
                });
            }

            else if (typeof(item.itemName) === "string") {
                items.push(item);
            }
        });

        (await this._profileFormService.updateMentorItemsAsync(items))
            .subscribe(response => {
                console.log("Обновленные предметы: ", response);     
                this.isEditItemRow = false; 
            });
    };



    public onEditPrice() {
        this.isEditPriceRow = true;
    };

    /**
     * Функция обновит список цен преподавателя.
     * @param mentorPrices - Список цен для обновления.
     * @returns - Обновленные цены.
     */
    public async onUpdateMentorPricesAsync(prices: any) {
        (await this._profileFormService.updateMentorPricesAsync(prices))
            .subscribe(response => {
                console.log("Обновленные цены: ", response);     
                this.isEditPriceRow = false; 
            });
    };

    public onEditDuration() {
        this.isEditDuration = true;
    };

    /**
     * Функция изменит длительности преподавателя.
     * @param durations - Длительности преподавателя.
     */
    public async onUpdateMentorDurationsAsync(mentorDurations: any) {
        let items: MentorDurations[] = [];

        // TODO: хорошо бы это отрефакторить, чтобы убрать такое поведение с object.
        mentorDurations.forEach((item: any) => {
            if (typeof(item.time) === "object") {
                let duration = new MentorDurations();
                duration.time = item.time.time;
                duration.unit = item.unit;
                items.push(duration);
            }

            else {
                let duration = new MentorDurations();
                duration.time = item.time;
                duration.unit = item.unit;
                items.push(item);
            }
        });
        
        (await this._profileFormService.updateMentorDurationsAsync(items))
        .subscribe(response => {
            console.log("Обновленные длительности: ", response);     
            this.isEditDuration = false; 
        });
    };

    public onChangeStateTime() {
        this.isEditTime = true;
    };

    /**
     * Функция изменит время преподавателя.
     * @param durations - Время преподавателя.
     */
     public async onUpdateMentorTimesAsync(mentorTimes: any) {
        let items: MentorTimes[] = [];

        // TODO: хорошо бы это отрефакторить, чтобы убрать такое поведение с object.
        mentorTimes.forEach((item: any) => {
            if (typeof(item.dayName) === "object") {
                let time = new MentorTimes();
                time.dayId = item.position;
                time.daySysName = item.dayName.daySysName;
                time.timeStart = item.timeStart;
                time.timeEnd = item.timeEnd;
                items.push(time);
            }

            else {
                let time = new MentorTimes();
                time.dayId = item.position;
                time.daySysName = item.daySysName;
                time.timeStart = item.timeStart;
                time.timeEnd = item.timeEnd;
                items.push(time);
            }
        });
        
        (await this._profileFormService.updateMentorTimesAsync(items))
        .subscribe(response => {
            console.log("Обновленные длительности: ", response);     
            this.isEditDuration = false; 
        });
    };

    /**
     * Функция изменит данные о преподавателе.
     * @param aboutInfos - Данные о преподавателе.
     */
     public async onUpdateMentorAboutInfoAsync(aboutInfos: any) {
        let items: MentorAboutInfo[] = [];

        aboutInfos.forEach((item: any) => {
            let about = new MentorAboutInfo();
            about.aboutInfoText = item.aboutInfoText;
            items.push(about);
        });
        
        (await this._profileFormService.updateMentorAboutInfosAsync(items))
        .subscribe(response => {
            console.log("Обновленные данные о себе: ", response);     
            this.isEditAboutInfo = false; 
        });
    };

    public onChangeStateAboutInfo() {
        this.isEditAboutInfo = true;
    };

    public onChangeStateEducations() {
        this.isEditEducations = true;
    };

    /**
     * Функция изменит данные об образовании преподавателе.
     */
    public async onUpdateMentorEducationsAsync(mentorEducations: any) {
        let items: MentorEducations[] = [];

        mentorEducations.forEach((item: any) => {
            let education = new MentorEducations();
            education.educationText = item.educationText;
            items.push(education);
        });
        
        (await this._profileFormService.updateMentorEducationsAsync(items))
        .subscribe(response => {
            console.log("Обновленные данные об образовании: ", response);     
            this.isEditEducations = false; 
        });
    };

    public onChangeStateExperience() {
        this.isEditExperience = true;
    };

     /**
     * Функция изменит данные об опыте преподавателе.
     */
      public async onUpdateMentorExperienceAsync(mentorExperience: any) {
        let items: MentorExperience[] = [];

        mentorExperience.forEach((item: any) => {
            let experience = new MentorExperience();
            experience.experienceText = item.experienceText;
            items.push(experience);
        });
        
        (await this._profileFormService.updateMentorExperienceAsync(items))
        .subscribe(response => {
            console.log("Обновленные данные об опыте: ", response);     
            this.isEditExperience = false; 
        });
    };

    public onChangeStateCerts() {
        this.isEditCerts = true;
    };

    /**
     * Функция изменит изображения сертификатов пользователя.
     */
    public async onCreateCertsAsync() {
        console.log("new certs",this.profileForm.controls["certs"].value.get("certs"));
        let formData = new FormData();
        formData.append("mentorCertificates", this.profileForm.controls["certs"].value.get("certs"));

        (await this._profileFormService.updateMentorCertsAsync(formData))
        .subscribe(response => {
            console.log("Добавленные сертификаты: ", response);     
            this.isEditCerts = false; 
        });
    };

    public onAddMentorItems() {    
        this.profileWorksheet$.value.mentorItems.push({
            itemName: "",
            itemNumber: 0,
            itemSysName: "",
            profileItemId: 0,
            position: 0
        });
    };

      public onAddMentorPrices() {    
        this.profileWorksheet$.value.mentorPrices.push({
            fullPrice: "",
            price: 0,
            profileItemId: " руб."
        });
    };

    public onAddMentorDurations() {    
        this.profileWorksheet$.value.mentorPrices.push({
            educationText: ""
        });
    };

    public onAddMentorTimes() {    
        this.profileWorksheet$.value.mentorTimes.push({
            dayName: "",
            daySysName: "",
            timeEnd: "",
            timeStart: ""
        });
    };

    // public onAddMentorAboutInfo() {    
    //     this.profileWorksheet$.value.mentorAboutInfo.push({
    //         aboutInfoText: ""
    //     });
    //     this.isEditAboutInfo = true;
    //     console.log("this.profileWorksheet$.value.mentorAboutInfo",this.profileWorksheet$.value.mentorAboutInfo);
    // };

    public async onAddDefaultMentorAboutInfoAsync() {    
        (await this._profileFormService.addDefaultMentorAboutInfoAsync())
        .subscribe(_ => {
            this.isEditAboutInfo = true; 
        });
    };

    public async onAddDefaultMentorEducationAsync() {    
        (await this._profileFormService.addDefaultMentorEducationAsync())
        .subscribe(_ => {
            this.isEditEducations = true; 
        });
    };

    public async onAddDefaultMentorExperienceAsync() {    
        (await this._profileFormService.addDefaultMentorExperienceAsync())
        .subscribe(_ => {
            this.isEditExperience = true; 
        });
    };
}
