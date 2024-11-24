import CardList from '../components/mainpage/CardList';

const MainPage = () => {
  return (
    <div className="flex flex-col items-center w-full p-12">
      <CardList category="painting" />
      <CardList category="music" />
      <CardList category="exercise" />
      <CardList category="cooking" />
      <CardList category="game" />
      <CardList category="movie" />
    </div>
  );
};

export default MainPage;
