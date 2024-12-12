import { Link } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <LoginForm />
      <div className="flex gap-2 pt-6">
        <div className="text-[#4B4B4B]">회원이 아니신가요?</div>
        <Link to="/signup" className="text-yellowHover underline">
          회원가입하기
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
