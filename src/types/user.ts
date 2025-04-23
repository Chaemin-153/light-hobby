import { Timestamp } from 'firebase/firestore';

export interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
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
