import { Timestamp } from 'firebase/firestore';

export interface HobbyData {
  id: string;
  title: string;
  views: number;
  likes: number;
  description: string;
  imagePath: string;
  category: string;
  createdAt: Timestamp;
  imageUrl?: string;
}
