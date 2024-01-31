export interface User {
  username: string;
  email: string;
  password: string;
  fullname: string;
  birthdate: Date | null;
  gender: string;
  profilePicture: string;
  address: string;
  preferencesNotifications: {
    email: boolean;
    telf: boolean;
  };
  userRole: string;
  activityLog: [];
}
