/**
 * Класс входной модели для левого меню профиля пользователя.
 */
export class ProfileMenuInput {
    iconUrl: string = "";
    isDropdown: boolean = false;
    isSelectItem: boolean = false;
    isVisibleBalance: boolean = false;
    menuType: number = 0;
    position: number = 0;
    profileItemSysName: string = "";
    profileItemTitle: string = "";
    profileItemUrl: string = "";
}