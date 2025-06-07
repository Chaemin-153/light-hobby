import { FirebaseError } from 'firebase/app';
import { deleteUser, getAuth, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import reauthenticateGoogle from '../utils/reauthenticateGoogle';
import reauthenticate from '../utils/reauthenticate';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const MyPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(() => auth.currentUser);
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleNicknameUpdate = async () => {
    if (!user || !user.uid) return;

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateProfile(user, { displayName: nickname });
      await updateDoc(userDocRef, {
        nickname,
        updatedAt: new Date(),
      });
      setMessage('닉네임이 성공적으로 변경되었습니다.');
    } catch (error) {
      console.error('닉네임 변경 실패:', error);
      setMessage('닉네임 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const deleteAccount = async () => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);

      try {
        // Firebase Auth 유저 삭제
        await deleteUser(user);
        // Firestore 'users' 컬렉션에서 문서 삭제
        await deleteDoc(userDocRef);

        navigate('/');
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
              // Firebase Auth 유저 삭제
              await deleteUser(user);
              // Firestore 'users' 컬렉션에서 문서 삭제
              await deleteDoc(userDocRef);

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
      setNickname(user?.displayName ?? '');
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="flex justify-center w-full p-12 gap-4">
      <div className="flex flex-col p-4 w-[200px] xl:w-[200px] h-full border-4 border-yellow rounded-xl">
        <div className="flex flex-col justify-between font-bold gap-4">
          <Link to={'/mypage'}>
            <h2 className="text-xl md:text-xl sm:text-xl mob:text-lg text-yellow border-b-[4px] border-yellow">
              내 계정
            </h2>
          </Link>
          <Link to={'/mypage/likes'}>
            <h2 className="text-xl md:text-xl sm:text-xl mob:text-lg btn-hover-yellow">
              좋아요
            </h2>
          </Link>
          <Link to={'/mypage/saves'}>
            <h2 className="text-xl md:text-xl sm:text-xl mob:text-lg btn-hover-yellow">
              저장
            </h2>
          </Link>
          <Link to={'/mypage/my-postings'}>
            <h2 className="text-xl md:text-xl sm:text-xl mob:text-lg btn-hover-yellow">
              내 게시글
            </h2>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-start gap-8 p-12 w-full xl:w-pc border-4 border-yellow rounded-xl">
        <div className="text-left w-full font-bold border-b border-gray-200 pb-8">
          <h2 className="text-2xl md:text-xl sm:text-xl mob:text-lg">
            내 계정
          </h2>
        </div>

        <div className="flex flex-col gap-6 w-full h-full">
          {/* Nickname */}
          <div className="flex flex-col gap-2 w-full pb-8 border-b border-gray-200">
            <label htmlFor="nickname" className="block text-left text-xl w-1/3">
              닉네임
            </label>
            <div className="flex gap-2">
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                className="w-1/3 px-3 py-2 border rounded focus:border-yellow focus:outline-none"
              />
              <button
                onClick={handleNicknameUpdate}
                className="bg-yellow text-white px-4 py-2 rounded hover:bg-yellowHover"
              >
                저장
              </button>
            </div>
            {message && (
              <p className="text-left text-sm text-green-600">{message}</p>
            )}
          </div>
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
