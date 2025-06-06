import { Timestamp } from 'firebase/firestore';

export interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface UserInteraction {
  userId: string;
  hobbyId: string;
  liked: boolean;
  saved: boolean;
  createdAt: Timestamp;
}

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Timestamp;
}

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
