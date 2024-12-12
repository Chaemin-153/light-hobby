import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('로그인 성공!', data);
      alert('로그인 성공!');
      navigate('/');
    } catch (error) {
      console.log('로그인 실패', error);
      alert('로그인 실패');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-96 h-full mx-auto"
    >
      {/* Email Input */}
      <div className="flex flex-col gap-2 text-left">
        <label htmlFor="email" className="block text-left">
          이메일
        </label>
        <input
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: '이메일 형식에 맞지 않습니다.',
            },
          })}
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded focus:border-yellow focus:outline-none"
        />
        {errors.email && (
          <small className="text-red-500">{errors.email.message}</small>
        )}
      </div>
      {/* Password Input */}
      <div className="flex flex-col gap-2 text-left">
        <label htmlFor="password" className="block text-left">
          비밀번호
        </label>
        <input
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 6,
              message: '비밀번호는 최소 6자 이상이어야 합니다.',
            },
          })}
          type="password"
          id="password"
          className="w-full px-3 py-2 border rounded focus:border-yellow focus:outline-none"
        />
        {errors.password && (
          <small className="text-red-500">{errors.password.message}</small>
        )}
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-yellow text-white py-2 rounded focus:border-yellow focus:outline-none hover:bg-yellowHover"
        disabled={isSubmitting}
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
