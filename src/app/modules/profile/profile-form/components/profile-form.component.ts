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
 * Класс модуля анкеты профиля пользователя.
 */
export class ProfileFormModule implements OnInit {
    public readonly profileItems$ = this._profileFormService.profileItems$;
    public readonly profileItemsDropdown$ = this._profileFormService.profileItemsDropdown$;
    public readonly profilePurposeDropdown$ = this._profileFormService.profilePurposeDropdown$;
    public readonly formProfile$ = this._profileFormService.formProfile$;
    public readonly profileDaysWeek$ = this._profileFormService.profileDaysWeek$;
    public readonly profileCerts$ = this._profileFormService.profileCerts$;
    public readonly profileAvatar$ = this._profileFormService.profileAvatar$;

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
            await this.getAvatarAsync()
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
        mentorTime.day = this.selectedMentorDayWeek.daySysName;

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
}
