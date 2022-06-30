import { MentorAboutInfo } from "../mentor-about-into";
import { MentorDurations } from "../mentor-durations";
import { MentorEducations } from "../mentor-educations";
import { MentorExperience } from "../mentor-experience";
import { MentorProfilePrices } from "../mentor-prices";
import { MentorProfileItems } from "../mentor-profile-items";
import { MentorTimes } from "../mentor-times";
import { MentorTrainings } from "../mentor-trainings";

/**
 * Класс входной модели сохранения анкеты преподавателя.
 */
export class SaveMentorProfileUserInfoInput {
    // Имя.
    firstName: string = "";

    // Фамилия.
    lastName: string = "";

    // Отчество.
    secondName: string = "";

    phoneNumber: string = "";

    email: string = "";

    isVisibleAllContact: boolean = false;

    // Список предметов.
    userItems: MentorProfileItems[]  = [];

    // Список цен пользователя.
    userPrices: MentorProfilePrices[] = [];

    // Список длительностей преподавателя.
    userDurations: MentorDurations[] = [];

    // Список свободного времени преподавателя.
    userTimes: MentorTimes[] = [];

    // Список целей подготовки преподавателя.
    mentorTrainings: MentorTrainings[] = [];

    // Список опыта преподавателя.
    mentorExperience: MentorExperience[] = [];

    // Список образований преподавателя.
    mentorEducations: MentorEducations[] = [];

    // Список информации о препродавателе.
    mentorAboutInfo: MentorAboutInfo[] = [];
}