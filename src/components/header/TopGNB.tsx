import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut, User } from 'firebase/auth';

const TopGNB = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('로그아웃 되었습니다');
      navigate('/login');
    } catch (error) {
      alert('로그아웃을 실패했습니다');
      console.log('로그아웃 실패', error);
    }
  };

  return (
    <div className="flex justify-center bg-yellow text-white text-2xl sm:text-xl mob:text-base font-bold p-6">
      <div className="flex justify-between w-pc">
        <Link to={'/'}>
          <div className="flex items-center gap-2 sm:gap-1 mob:gap-0">
            <img
              className="w-8 h-8 sm:w-6 sm:h-6 mob:w-5 mob:h-5"
              src="/assets/yellowLogoIconImg.png"
              alt="Light Hobby Logo"
            />
            <div>Light Hobby</div>
          </div>
        </Link>
        <div className="w-40 sm:w-32 mob:w-28 flex justify-between text-xl sm:text-base mob:text-sm">
          {currentUser ? (
            <>
              <Link to={'/'}>
                <div>내 정보</div>
              </Link>
              <Link to={'/'}>
                <button onClick={handleLogout}>로그아웃</button>
              </Link>
            </>
          ) : (
            <>
              <Link to={'/signup'}>
                <div>회원가입</div>
              </Link>
              <Link to={'/login'}>
                <div>로그인</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopGNB;
