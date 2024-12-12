import { Link, Outlet } from 'react-router-dom';
import Footer from '../footer';

const AuthLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen gap-4">
      <div className="pt-8 w-1/4">
        <Link to={'/'} className="flex justify-center">
          <img src="/assets/whiteLogoImg.png" alt="Light Hobby Logo" />
        </Link>
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
