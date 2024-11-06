import CardList from '../components/mainpage/CardList';

const MainPage = () => {
  return (
    <div className="flex flex-col items-center w-full p-12">
      <CardList />
      <CardList />
      <CardList />
      <CardList />
    </div>
  );
};

export default MainPage;
