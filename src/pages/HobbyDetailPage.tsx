import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HobbyData } from '../types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const HobbyDetailPage = () => {
  const { category, id } = useParams();
  const [hobby, setHobby] = useState<HobbyData>();
  const storage = getStorage();

  const fetchHobbydata = async (): Promise<void> => {
    if (!category || !id) return;

    try {
      const docRef = doc(db, category, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as HobbyData;

        if (data.imagePath) {
          const imageRef = ref(storage, data.imagePath);
          data.imageUrl = await getDownloadURL(imageRef);
        }

        setHobby(data);
      } else {
        console.log('문서를 찾을 수 없습니다!');
      }
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchHobbydata();
  }, [category, id]);

  return (
    <div className="w-full p-8">
      {hobby ? (
        <>
          <p className="flex pb-2">카테고리 &gt; music</p>
          <div className="flex justify-around w-full">
            {hobby.imageUrl ? (
              <img
                src={hobby.imageUrl}
                alt={hobby.title}
                className="w-1/2 rounded-xl"
              />
            ) : (
              <div className="bg-yellow w-64 h-64 rounded-xl" />
            )}
            <div className="flex flex-col items-start w-1/2 gap-2 pl-8">
              <h2 className="text-2xl font-bold">{hobby.title}</h2>
              <p>{hobby.description}</p>
              <p>{hobby.createdAt.toDate().toLocaleString()}</p>
              <div className="flex gap-4 text-xs font-bold text-gray-400">
                <p>likes{hobby.likes}</p>
                <p>views{hobby.views}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>문서 불러오기 실패</p>
      )}
    </div>
  );
};

export default HobbyDetailPage;
