export interface PersonalData {
  email: string;
  firstName: string;
  isVisibleAllContact: boolean;
  lastName: string;
  mentorAboutInfo: Array<MentorAbout>;
  mentorAge: Array<any>;
  mentorEducations: Array<MentorEducation>;
  mentorExperience: Array<MentorExperiences>;
  mentorGenders: Array<any>;
  phoneNumber: string;
  secondName: string;
  studentAgeMentor: null
  studentComments: null
  studentGenderMentor: null
  userDurations: Array<UserDurations>;
  userItems: Array<UserItems>;
  userPrices: Array<UserPrices>;
  userRole: number;
  userTimes: Array<UserTimes>;
  userTrainings: Array<UserTrainings>;
}

export interface MentorAbout {
  aboutInfoId: number
  aboutInfoText: string;
}

export interface MentorEducation {
  educationId: number;
  educationText: string;
}

export interface MentorExperiences {
  experienceId: number;
  experienceText: string;
}


export interface UserDurations {
  durationId: number
  fullDuration: string;
  time: number;
  unit: string;
}

export interface UserItems {
  itemId: number;
  itemName: string;
  itemNumber: number;
  itemSysName: string;
  position: number;
}

export interface UserPrices {
  fullPrice: string;
  price: number;
  priceId: number;
  unit: string;
}

export interface UserTimes {
  dayId: number;
  dayName: null;
  daySysName: null;
  timeEnd: string;
  timeId: number;
  timeStart: string;
}

export interface UserTrainings {
  isSelected: boolean;
  purposeId: number
  purposeName: string;
  purposeSysName: string;
}
