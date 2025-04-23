import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
      const docRef = doc(db, 'hobbies', category, 'items', id);
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
          <div className="flex pb-2 gap-1 font-bold text-gray-600">
            <Link to={'/'}>
              <p>home</p>
            </Link>
            <p>&gt;</p>
            <Link to={`/${category}`}>
              <p>{category}</p>
            </Link>
            <p>&gt;</p>
            <Link to={`/${category}/${hobby.id}`} className="overflow-hidden">
              <p className="truncate">{hobby.title}</p>
            </Link>
          </div>
          <div className="flex justify-around w-full">
            <img
              src={hobby.imageUrl}
              alt={hobby.title}
              className="w-1/2 rounded-xl"
            />
            <div className="flex flex-col items-start w-1/2 gap-2 pl-8 text-left">
              <h2 className="text-2xl font-bold line-clamp-3 sm:line-clamp-2 mob:line-clamp-2">
                {hobby.title}
              </h2>
              <p>{hobby.description}</p>
              <p>{hobby.createdAt.toDate().toLocaleString()}</p>
              <div className="flex gap-4 text-xs font-bold text-gray-400">
                <p>likes{hobby.likes}</p>
                <p>views{hobby.views}</p>
              </div>

              {/* 좋아요, 저장 Button */}
              <div className="flex sm:flex-col mob:flex-col gap-4 w-full mt-auto text-2xl sm:text-xl mob:text-xl font-semibold">
                <div className="w-1/2 sm:w-full mob:w-full text-center bg-red btn-hover-red rounded-xl p-4 text-white">
                  좋아요
                </div>
                <div className="w-1/2 sm:w-full mob:w-full text-center bg-purple btn-hover-purple rounded-xl p-4 text-white">
                  저장
                </div>
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
