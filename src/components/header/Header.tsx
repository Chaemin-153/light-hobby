import MainGNB from './MainGNB';
import TopGNB from './TopGNB';

const Header = () => {
  return (
    <div className="fixed top-0 flex flex-col w-full">
      <TopGNB />
      <MainGNB />
    </div>
  );
};

export default Header;
