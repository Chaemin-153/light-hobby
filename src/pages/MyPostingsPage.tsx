import { collectionGroup, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react';
import { HobbyData } from '../types';
import HobbyCard from '../components/common/HobbyCard';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

const MyPostingsPage = () => {
  const storage = getStorage();
  const [myHobbyList, setMyHobbyList] = useState<HobbyData[]>([]);

  const fetchMyHobbies = async (uid: string) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const myHobbiesRef = collectionGroup(db, 'items');
      const myHobbiesQuery = query(myHobbiesRef, where('authorId', '==', uid));
      const myHobbiesSnapShot = await getDocs(myHobbiesQuery);

      const hobbyPromises = myHobbiesSnapShot.docs.map(async (docSnap) => {
        const hobby = {
          id: docSnap.id,
          ...docSnap.data(),
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
      setMyHobbyList(hobbies);
    } catch (error) {
      console.error('내 게시글 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchMyHobbies(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-start gap-8 p-6 w-full xl:w-pc border-4 border-yellow rounded-xl">
      <div className="text-left w-full font-bold pb-8">
        <h2 className="text-2xl md:text-xl sm:text-xl mob:text-lg">
          내 게시글
        </h2>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mob:grid-cols-1 gap-4">
        {/* Card Content */}
        {myHobbyList.map((hobby) => (
          <HobbyCard hobby={hobby} key={hobby.id} />
        ))}
      </div>
    </div>
  );
};

export default MyPostingsPage;
