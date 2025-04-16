import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaintingPage from './pages/PaintingPage';
import MusicPage from './pages/MusicPage';
import ExercisePage from './pages/ExercisePage';
import CookingPage from './pages/CookingPage';
import GamePage from './pages/GamePage';
import MoviePage from './pages/MoviePage';
import AuthLayout from './components/common/AuthLayout';
import HobbyDetailPage from './pages/HobbyDetailPage';
import HobbyPostPage from './pages/HobbyPostPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        {/* 로그인 페이지 */}
        <Route path="login" element={<LoginPage />} />
        {/* 회원가입 페이지 */}
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route path="/" element={<Layout />}>
        {/* 메인 페이지 */}
        <Route index element={<MainPage />} />
        {/* 그림 카테고리 */}
        <Route path="painting" element={<PaintingPage />} />
        {/* 음악 카테고리 */}
        <Route path="music" element={<MusicPage />} />
        {/* 운동 카테고리 */}
        <Route path="exercise" element={<ExercisePage />} />
        {/* 요리 카테고리 */}
        <Route path="cooking" element={<CookingPage />} />
        {/* 게임 카테고리 */}
        <Route path="game" element={<GamePage />} />
        {/* 영화 카테고리 */}
        <Route path="movie" element={<MoviePage />} />
        {/* 취미 상세페이지 */}
        <Route path=":category/:id" element={<HobbyDetailPage />} />
        {/* 게시물 작성 페이지 */}
        <Route path="post/upload" element={<HobbyPostPage />} />
        {/* 마이페이지 추가 예정 */}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
