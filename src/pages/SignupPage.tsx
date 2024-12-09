import { Link } from 'react-router-dom';
import SignUpForm from '../components/signup/SignUpForm';

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <SignUpForm />
      <div className="flex gap-2 pt-6">
        <div className="text-[#4B4B4B]">회원이신가요?</div>
        <Link to="/login" className="text-yellowHover underline">
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
