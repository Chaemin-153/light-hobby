import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
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
