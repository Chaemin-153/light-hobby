import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Layout from './pages/Layout';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 메인 페이지 */}
        <Route index element={<MainPage />} />
        {/* 로그인 추가 예정 */}
        {/* 회원가입 추가 예정 */}
        {/* 마이페이지 추가 예정 */}
        {/* 카테고리 추가 예정 */}
        {/* 그림 카테고리 추가 예정 */}
        {/* 음악 카테고리 추가 예정 */}
        {/* 요리 카테고리 추가 예정 */}
        {/* 운동 카테고리 추가 예정 */}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
