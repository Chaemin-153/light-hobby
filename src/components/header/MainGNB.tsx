import { Link } from 'react-router-dom';

const MainGNB = () => {
  return (
    <div className="flex justify-center border-b-[1px]">
      <div className="flex justify-around w-pc text-xl sm:text-base mob:text-sm font-bold text-gray-600 p-6 ">
        <Link to={'/category/painting'}>
          <div className="btn-hover border-b-[4px] border-white">그림</div>
        </Link>
        <Link to={'/category/music'}>
          <div className="btn-hover border-b-[4px] border-white">음악</div>
        </Link>
        <Link to={'/category/exercise'}>
          <div className="btn-hover border-b-[4px] border-white">운동</div>
        </Link>
        <Link to={'/category/cooking'}>
          <div className="btn-hover border-b-[4px] border-white">요리</div>
        </Link>
        <Link to={'/category/game'}>
          <div className="btn-hover border-b-[4px] border-white">게임</div>
        </Link>
        <Link to={'/category/movie'}>
          <div className="btn-hover border-b-[4px] border-white">영화</div>
        </Link>
      </div>
    </div>
  );
};

export default MainGNB;
