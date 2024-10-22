import { Outlet } from 'react-router-dom';
import Header from '../components/header';

const Layout = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Header 추가 예정 */}
      <Header />
      <Outlet />
      {/* Footer 추가 예정 */}
      <h2>Footer</h2>
    </div>
  );
};

export default Layout;
