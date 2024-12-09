import { Link, Outlet } from 'react-router-dom';
import Footer from '../footer';

const AuthLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-8 mt-8">
      <Link to={'/'} className="flex justify-center w-1/4">
        <img src="/assets/whiteLogoImg.png" alt="Light Hobby Logo" />
      </Link>
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
