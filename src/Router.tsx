import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaintingPage from './pages/PaintingPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 메인 페이지 */}
        <Route index element={<MainPage />} />
        {/* 로그인 페이지 */}
        <Route path="login" element={<LoginPage />} />
        {/* 회원가입 페이지 */}
        <Route path="signup" element={<SignupPage />} />
        {/* 마이페이지 추가 예정 */}
        {/* 카테고리 */}
        <Route path="category">
          {/* 그림 카테고리 */}
          <Route path="painting" element={<PaintingPage />} />
          {/* 음악 카테고리 추가 예정 */}
          {/* 요리 카테고리 추가 예정 */}
          {/* 운동 카테고리 추가 예정 */}
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
