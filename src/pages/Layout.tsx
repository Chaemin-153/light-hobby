import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* Header 추가 예정 */}
      <h2>Header</h2>
      <Outlet />
      {/* Footer 추가 예정 */}
      <h2>Footer</h2>
    </div>
  );
};

export default Layout;
