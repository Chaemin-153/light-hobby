const TopGNB = () => {
  return (
    <div className="flex justify-center bg-yellow text-white text-2xl sm:text-xl mob:text-base font-bold p-6">
      <div className="flex justify-between w-pc">
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8"
            src="/assets/yellowLogoIconImg.png"
            alt="Light Hobby Logo"
          />
          <div>Light Hobby</div>
        </div>
        <div className="w-40 sm:w-32 mob:w-28 flex justify-between text-xl sm:text-base mob:text-sm">
          <div>회원가입</div>
          <div>로그인</div>
        </div>
      </div>
    </div>
  );
};

export default TopGNB;
