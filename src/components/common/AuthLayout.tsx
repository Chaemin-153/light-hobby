import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen gap-4 pb-24">
      <div className="w-1/4">
        <Link to={'/'} className="flex justify-center">
          <img src="/assets/whiteLogoImg.png" alt="Light Hobby Logo" />
        </Link>
      </div>
      <div className="flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
