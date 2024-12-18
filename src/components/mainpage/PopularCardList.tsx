import { Link } from 'react-router-dom';
import translateCategory from '../../utils/translateCategory';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import HobbyCard from '../common/HobbyCard';

interface HobbyData {
  id: string;
  title: string;
  views: number;
  likes: number;
  description: string;
  imagePath: string;
  imageUrl?: string;
}

const CardList = ({ category }: { category: string }) => {
  const categoryName = translateCategory(category); // Category를 한글로 변경

  const [hobbyDataList, setHobbyDataList] = useState<HobbyData[]>([]);
  const storage = getStorage();

  const fetchHobbyData = async (category: string): Promise<void> => {
    try {
      const hobbyCollection = collection(db, category);
      const hobbyQuery = query(
        hobbyCollection,
        orderBy('likes', 'desc'),
        limit(4)
      );
      const querySnapShot = await getDocs(hobbyQuery);

      const hobbyList: HobbyData[] = [];

      for (const doc of querySnapShot.docs) {
        const hobby = {
          id: doc.id,
          ...doc.data(),
        } as HobbyData;
        if (hobby.imagePath) {
          const imageRef = ref(storage, hobby.imagePath);
          hobby.imageUrl = await getDownloadURL(imageRef);
        }
        hobbyList.push(hobby);
      }

      setHobbyDataList(hobbyList);
    } catch (error) {
      alert(error);
      console.error('Error fetching hobby data: ', error);
      alert('데이터를 불러오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchHobbyData(category);
  }, [category]);

  return (
    <div className="flex flex-col gap-8 p-6 mb-8 w-[1200px] border-4 border-yellow rounded-xl">
      {/* CardList Header */}
      <div className="flex justify-between font-bold">
        <h2 className="text-2xl">인기 {categoryName}</h2>
        <Link to={`/category/${category}`}>
          <div>전체보기</div>
        </Link>
      </div>
      {/* CardList Content */}
      <div className="grid grid-cols-4 gap-8">
        {/* Card Content */}
        {hobbyDataList.map((hobby) => (
          <HobbyCard hobby={hobby} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
