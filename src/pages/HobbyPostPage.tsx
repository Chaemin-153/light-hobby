import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { HobbyPostFormValues } from '../types';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const HobbyPostPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<HobbyPostFormValues>();

  const onSubmit: SubmitHandler<HobbyPostFormValues> = async (data) => {
    const { title, description, category, image } = data;

    try {
      const file = image[0];
      const storage = getStorage();
      const storagePath = `${category}/${category}_${Date.now()}_${file.name}`;
      const imageRef = ref(storage, storagePath);

      await uploadBytes(imageRef, file);

      const categoryCollectionRef = collection(db, category);
      const snapShot = await getDocs(categoryCollectionRef);
      const docCount = snapShot.size;
      const newId = `${docCount + 1}`;

      const newDoc = {
        id: newId,
        title,
        description,
        category,
        imagePath: storagePath,
        createdAt: Timestamp.now(),
        likes: 0,
        views: 0,
      };

      await setDoc(doc(db, category, newId), newDoc);

      console.log('업로드 성공!', data);
      alert('업로드 성공!');
      navigate(`/${category}`);
    } catch (error) {
      console.log('업로드 실패', error);
      alert('업로드 실패');
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-12">
      <div className="flex flex-col gap-8 p-6 mb-8 w-full xl:w-pc border-4 border-yellow rounded-xl">
        <div className="flex justify-between font-bold">
          <h2 className="text-2xl md:text-xl sm:text-xl mob:text-lg">
            글 작성하기
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-96 sm:w-full mob:w-full h-full mx-auto"
        >
          {/* Title Input */}
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="title" className="block text-left">
              제목
            </label>
            <input
              {...register('title', {
                required: '제목을 입력해주세요.',
                maxLength: 60,
              })}
              type="title"
              id="title"
              className="w-full px-3 py-2 border rounded focus:border-yellow focus:outline-none"
            />
            {errors.title && (
              <small className="text-red-500">{errors.title.message}</small>
            )}
          </div>
          {/* Description Input */}
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="description">설명</label>
            <textarea
              {...register('description', {
                required: '설명을 입력해주세요.',
                maxLength: 1000,
              })}
              id="description"
              rows={6}
              className="w-full px-3 py-2 border rounded focus:border-yellow focus:outline-none resize-none"
            />
            {errors.description && (
              <small className="text-red-500">
                {errors.description.message}
              </small>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="category">카테고리</label>
            <select
              {...register('category', {
                required: '카테고리를 선택해주세요.',
              })}
              id="category"
              className="w-full px-3 py-2 border rounded focus:border-yellow focus:outline-none"
            >
              <option value="">선택하세요</option>
              <option value="painting">그림</option>
              <option value="music">음악</option>
              <option value="exercise">운동</option>
              <option value="cooking">요리</option>
              <option value="game">게임</option>
              <option value="movie">영화</option>
            </select>
            {errors.category && (
              <small className="text-red-500">{errors.category.message}</small>
            )}
          </div>

          {/* Image Upload Input */}
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="image">이미지 업로드</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register('image', {
                required: '이미지를 선택해주세요',
              })}
              placeholder="이미지를 선택해주세요"
              className="w-full px-3 py-2 border rounded focus:border-yellow focus:outline-none"
            />
            {errors.image && (
              <small className="text-red-500">{errors.image.message}</small>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow text-white py-2 rounded focus:border-yellow focus:outline-none hover:bg-yellowHover"
            disabled={isSubmitting}
          >
            작성 완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default HobbyPostPage;
