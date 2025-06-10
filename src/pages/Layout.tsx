import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

const Layout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <div className="flex-grow mt-40">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
