import { Link, NavLink, Outlet } from 'react-router-dom';

const MyPageLayout = () => {
  const baseClass = 'text-xl md:text-xl sm:text-xl mob:text-lg';
  const activeClass = 'text-yellow border-b-[4px] border-yellow';
  const inactiveClass = 'btn-hover-yellow';

  return (
    <div className="flex justify-center w-full p-12 gap-4">
      <div className="flex flex-col p-4 w-[200px] xl:w-[200px] h-full border-4 border-yellow rounded-xl">
        <div className="flex flex-col justify-between font-bold gap-4">
          <NavLink
            to={'/mypage'}
            end
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            내 계정
          </NavLink>
          <NavLink
            to="/mypage/likes"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            좋아요
          </NavLink>
          <NavLink
            to="/mypage/saves"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            저장
          </NavLink>
          <NavLink
            to="/mypage/my-postings"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            내 게시글
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MyPageLayout;
