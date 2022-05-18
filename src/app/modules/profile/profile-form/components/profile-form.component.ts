import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { forkJoin } from "rxjs";
import { MentorProfileItem } from "../models/input/mentor-profile-item-input";
import { SaveMentorProfileUserInfoInput } from "../models/input/save-mentor-profile-user-info-input";
import { MentorProfilePrices } from "../models/mentor-prices";
import { MentorProfileItems } from "../models/mentor-profile-items";
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

    checkedContact: boolean = false;
    selectedPurposes = new Set();
    profileFormInput: SaveMentorProfileUserInfoInput = new SaveMentorProfileUserInfoInput();
    mentorProfileItems: MentorProfileItems[]  = [];
    mentorPrices: MentorProfilePrices[] = [];
    selectedItem: MentorProfileItem = new MentorProfileItem();
    displaySelectedMentorProfileItems: MentorProfileItem[] = [];

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
        "certs": new FormControl(new FormData(), Validators.required)
    });

    constructor(private _profileFormService: ProfileFormService) {};

    public async ngOnInit() {     
        forkJoin([
            await this.getProfileItemsAsync(),
            await this.getLessonsDurationAsync(),
            await this.getPurposeTrainingsAsync(),
        ]).subscribe();
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

        // (await this._profileFormService.saveProfileUserInfoAsync(profileFormInput))
        // .subscribe(_ => {
        //     console.log("Данные анкеты: ", this.formProfile$.value);
        // });
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
    public onSelectPurpose(purpose: string) {
        console.log("onSelectPurpose", purpose);
        this.selectedPurposes.add(purpose);
        console.log("selectedPurposes", this.selectedPurposes);
    };

    /**
     * Функция запишет список предметов.
     */
    public addMentorProfileItems(selectedItem: MentorProfileItem) {
        console.log("addMentorProfileItems", selectedItem);
        
        let profileItem = new MentorProfileItems();
        profileItem.itemSysName = selectedItem.itemSysName;
        this.mentorProfileItems.push(profileItem);

        // Добавит добавленный предмет в список для вывода пользователю.
        this.displaySelectedMentorProfileItems.push(selectedItem);

        console.log("mentorProfileItems", this.mentorProfileItems);
        console.log("displaySelectedMentorProfileItems", this.displaySelectedMentorProfileItems);
    };

    public addMentorPrices(item: any) {  
        // let items = new MentorProfilePrices();
        // items.price = 
        console.log("addMentorPrices", item);
    };
}
