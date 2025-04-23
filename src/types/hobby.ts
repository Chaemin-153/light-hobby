import { Timestamp } from 'firebase/firestore';

export interface HobbyData {
  id: string;
  title: string;
  views: number;
  likes: number;
  saves: number;
  description: string;
  imagePath: string;
  category: string;
  createdAt: Timestamp;
  imageUrl?: string;
}

export interface HobbyPostFormValues {
  title: string;
  description: string;
  category: string;
  image: FileList;
}
