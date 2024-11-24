import PopularCardList from '../components/mainpage/PopularCardList';

const MainPage = () => {
  return (
    <div className="flex flex-col items-center w-full p-12">
      <PopularCardList category="painting" />
      <PopularCardList category="music" />
      <PopularCardList category="exercise" />
      <PopularCardList category="cooking" />
      <PopularCardList category="game" />
      <PopularCardList category="movie" />
    </div>
  );
};

export default MainPage;
