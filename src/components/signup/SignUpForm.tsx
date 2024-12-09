import { useForm, SubmitHandler } from 'react-hook-form';

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const { register, handleSubmit, watch } = useForm<SignUpFormValues>();

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    console.log('회원가입 성공!', data);
  };

  // 비밀번호 확인 값 체크를 위한 watch
  const password = watch('password');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-96 h-full mx-auto"
    >
      {/* Email Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="block text-left">
          이메일
        </label>
        <input
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: '유효한 이메일 주소를 입력해주세요.',
            },
          })}
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded focus:border-yellow focus:outline-none"
        />
      </div>
      {/* Password Input */}
      <div className="flex flex-col gap-2">
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
      </div>
      {/* Confirm Password Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="block text-left">
          비밀번호 확인
        </label>
        <input
          {...register('confirmPassword', {
            required: '비밀번호 확인을 입력해주세요.',
            validate: (value) =>
              value === password || '비밀번호가 일치하지 않습니다.',
          })}
          type="password"
          id="confirmPassword"
          className="w-full px-3 py-2 border rounded focus:border-yellow focus:outline-none"
        />
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-yellow text-white py-2 rounded focus:border-yellow focus:outline-none hover:bg-yellowHover"
      >
        회원가입
      </button>
    </form>
  );
};

export default SignUpForm;
