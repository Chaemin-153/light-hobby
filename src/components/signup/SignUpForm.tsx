import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { auth, db } from '../../firebase';
import { SignUpFormValues } from '../../types';
import { useNavigate } from 'react-router-dom';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    const { email, password, nickname } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: nickname,
      });

      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(
          userRef,
          {
            uid: user.uid,
            email: user.email,
            nickname: nickname,
            createdAt: serverTimestamp(),
          },
          { merge: true }
        );
      }

      alert('회원가입 성공!');
      navigate('/');
    } catch (error) {
      console.log('회원가입 실패', error);
      alert('회원가입 실패');
    }
  };

  // 비밀번호 확인 값 체크를 위한 watch
  const password = watch('password');

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
          <small className="text-red text-left">{errors.email.message}</small>
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
          <small className="text-red text-left">
            {errors.password.message}
          </small>
        )}
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
        {errors.confirmPassword && (
          <small className="text-red text-left">
            {errors.confirmPassword.message}
          </small>
        )}
      </div>
      {/* Nickname Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="nickname" className="block text-left">
          닉네임
        </label>
        <input
          {...register('nickname', {
            required: '닉네임을 입력해주세요.',
            maxLength: {
              value: 20,
              message: '닉네임을 20자 이하로 입력해주세요.',
            },
          })}
          type="text"
          id="nickname"
          className="w-full px-3 py-2 border rounded focus:border-yellow focus:outline-none"
        />
        {errors.nickname && (
          <small className="text-red text-left">
            {errors.nickname.message}
          </small>
        )}
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-yellow text-white py-2 rounded focus:border-yellow focus:outline-none hover:bg-yellowHover"
        disabled={isSubmitting}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignUpForm;
