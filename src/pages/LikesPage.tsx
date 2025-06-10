import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react';
import { HobbyData } from '../types';
import HobbyCard from '../components/common/HobbyCard';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const LikesPage = () => {
  const storage = getStorage();
  const [likedHobbyList, setLikedHobbyList] = useState<HobbyData[]>([]);

  const fetchLikedHobbies = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const interactionsRef = collection(db, 'userInteractions');
      const interactionQuery = query(
        interactionsRef,
        where('userId', '==', user.uid),
        where('liked', '==', true)
      );
      const interactionSnapShot = await getDocs(interactionQuery);

      const hobbyPromises = interactionSnapShot.docs.map(async (docSnap) => {
        const { hobbyId } = docSnap.data();
        // hobbyId = `${category}${id}` 형태이므로 category, id를 따로 추출
        const matched = hobbyId.match(/^([a-zA-Z]+)(.+)$/);
        const [, category, id] = matched;

        const hobbyRef = doc(db, 'hobbies', category, 'items', id);
        const hobbySnap = await getDoc(hobbyRef);

        if (!hobbySnap.exists()) return null;

        const hobby = {
          id: hobbySnap.id,
          ...hobbySnap.data(),
        } as HobbyData;

        if (hobby.imagePath) {
          const imageRef = ref(storage, hobby.imagePath);
          hobby.imageUrl = await getDownloadURL(imageRef);
        }

        return hobby;
      });

      const hobbies = (await Promise.all(hobbyPromises)).filter(
        Boolean
      ) as HobbyData[];
      setLikedHobbyList(hobbies);
    } catch (error) {
      console.error('좋아요한 게시글 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchLikedHobbies();
  }, []);

  return (
    <div className="flex flex-col items-start gap-8 p-6 w-full xl:w-pc border-4 border-yellow rounded-xl">
      <div className="text-left w-full font-bold pb-8">
        <h2 className="text-2xl md:text-xl sm:text-xl mob:text-lg">좋아요</h2>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mob:grid-cols-1 gap-4">
        {/* Card Content */}
        {likedHobbyList.map((hobby) => (
          <HobbyCard hobby={hobby} key={hobby.id} />
        ))}
      </div>
    </div>
  );
};

export default LikesPage;
