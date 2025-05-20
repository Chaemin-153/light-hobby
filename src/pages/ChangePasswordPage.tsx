import ChangePasswordForm from '../components/mypage/ChangePasswordForm';

const ChangePasswordPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-3xl font-bold">변경하실 비밀번호를 입력해주세요</h1>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;
