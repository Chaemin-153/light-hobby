import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { ChangePasswordFormValues } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>();
  const [message, setMessage] = useState('');

  const onSubmit = async (data: ChangePasswordFormValues) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      alert('로그인이 필요합니다.');
      navigate('/');
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        data.currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, data.newPassword);
      setMessage('비밀번호가 성공적으로 변경되었습니다');
      navigate('/mypage');
    } catch (error) {
      console.error('에러 객체:', error);

      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-credential') {
          setMessage('현재 비밀번호가 올바르지 않습니다');
        } else {
          setMessage('비밀번호 변경에 실패했습니다. 다시 시도해주세요');
        }
      } else {
        console.error('알 수 없는 에러:', error);
        setMessage('예기치 않은 오류가 발생했습니다');
      }
    }
  };

  const newPassword = watch('newPassword');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-96 h-full mx-auto"
    >
      {/* Current Password */}
      <div className="flex flex-col gap-2 text-left">
        <label htmlFor="currentPassword" className="block text-left">
          현재 비밀번호
        </label>
        <input
          {...register('currentPassword', {
            required: '현재 비밀번호를 입력해주세요.',
          })}
          type="password"
          id="currentPassword"
          className="w-full px-3 py-2 border rounded focus:border-yellow focus:outline-none"
        />
        {errors.currentPassword && (
          <small className="text-red">{errors.currentPassword.message}</small>
        )}
      </div>
      {/* New Password */}
      <div className="flex flex-col gap-2 text-left">
        <label htmlFor="newPassword" className="block text-left">
          신규 비밀번호
        </label>
        <input
          {...register('newPassword', {
            required: '최소 6자 이상(알파벳, 숫자 필수)',
            minLength: {
              value: 6,
              message: '비밀번호는 최소 6자 이상이어야 합니다.',
            },
          })}
          type="password"
          id="newPassword"
          className="w-full px-3 py-2 border rounded focus:border-yellow focus:outline-none"
        />
        {errors.newPassword && (
          <small className="text-red">{errors.newPassword.message}</small>
        )}
      </div>
      {/* Confirm New Password */}
      <div className="flex flex-col gap-2 text-left">
        <label htmlFor="confirmPassword" className="block text-left">
          신규 비밀번호 확인
        </label>
        <input
          {...register('confirmPassword', {
            required: '신규 비밀번호를 다시 입력해주세요.',
            validate: (value) =>
              value === newPassword || '비밀번호가 일치하지 않습니다.',
          })}
          type="password"
          id="confirmPassword"
          className="w-full px-3 py-2 border rounded focus:border-yellow focus:outline-none"
        />
        {errors.confirmPassword && (
          <small className="text-red">{errors.confirmPassword.message}</small>
        )}
      </div>
      {/* 상태 메시지 */}
      {message && <p className="text-center text-sm text-red">{message}</p>}
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-yellow text-white py-2 rounded focus:border-yellow focus:outline-none hover:bg-yellowHover"
        disabled={isSubmitting}
      >
        비밀번호 변경
      </button>
    </form>
  );
};

export default ChangePasswordForm;
