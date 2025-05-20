import { FirebaseError } from 'firebase/app';
import { deleteUser, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import reauthenticateGoogle from '../utils/reauthenticateGoogle';
import reauthenticate from '../utils/reauthenticate';

const MyPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(() => auth.currentUser);

  const deleteAccount = async () => {
    if (user) {
      try {
        await deleteUser(user);
        alert('회원탈퇴 되었습니다');
      } catch (error) {
        if (error instanceof FirebaseError) {
          console.log('회원탈퇴 실패', error);

          if (error.code === 'auth/requires-recent-login') {
            const isGoogleUser = user.providerData.some(
              (provider) => provider.providerId === 'google.com'
            );

            try {
              if (isGoogleUser) {
                await reauthenticateGoogle(user);
              } else {
                const password = prompt('비밀번호 입력');
                if (!password) return;
                await reauthenticate(user, password);
              }

              await deleteUser(user);
              navigate('/');
              alert('회원탈퇴 되었습니다');
            } catch (reauthError) {
              console.error('재인증 실패:', reauthError);
              alert('비밀번호가 일치하지 않습니다');
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="flex justify-center w-full p-12 gap-4">
      <div className="flex flex-col gap-8 p-4 w-[200px] xl:w-[200px] h-full border-4 border-yellow rounded-xl">
        <div className="flex flex-col justify-between font-bold gap-2">
          <h2 className="text-xl md:text-xl sm:text-xl mob:text-lg">내 계정</h2>
          <h2 className="text-xl md:text-xl sm:text-xl mob:text-lg">좋아요</h2>
          <h2 className="text-xl md:text-xl sm:text-xl mob:text-lg">저장</h2>
          <h2 className="text-xl md:text-xl sm:text-xl mob:text-lg">
            내 게시글
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-start gap-8 p-12 w-full xl:w-pc border-4 border-yellow rounded-xl">
        <div className="text-left w-full font-bold border-b border-gray-200 pb-8">
          <h2 className="text-2xl md:text-xl sm:text-xl mob:text-lg">
            내 계정
          </h2>
        </div>

        <div className="flex flex-col gap-6 w-full sm:w-full mob:w-full h-full">
          {/* Email */}
          <div className="flex flex-col gap-2 w-full pb-8 border-b border-gray-200">
            <label htmlFor="title" className="block text-left text-xl w-1/3">
              이메일
            </label>
            <div className="w-1/3 px-3 py-2 text-gray-400 border rounded focus:border-yellow focus:outline-none">
              {user?.email}
            </div>
          </div>
          {/* Change Password */}
          <div className="flex flex-col gap-2 text-left w-full border-b border-gray-200 pb-8">
            <label htmlFor="description" className="text-xl">
              비밀번호
            </label>
            <div className="flex w-full justify-end">
              <Link
                to={'change-password'}
                className="w-1/6 bg-yellow text-white font-bold text-center py-2 rounded focus:border-yellow focus:outline-none hover:bg-yellowHover"
              >
                비밀번호 변경
              </Link>
            </div>
          </div>

          {/* Delete Account */}
          <button
            className="self-end w-1/6 bg-yellow text-white font-bold py-2 rounded focus:border-yellow focus:outline-none hover:bg-yellowHover"
            onClick={deleteAccount}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
