import { Link } from 'react-router-dom';

const MainGNB = () => {
  return (
    <div className="flex justify-center border-b-[1px]">
      <div className="flex justify-around w-pc text-xl sm:text-base mob:text-sm font-bold text-gray-600 p-6 ">
        <Link to={'/painting'}>
          <div className="btn-hover-yellow border-b-[4px] border-white">
            그림
          </div>
        </Link>
        <Link to={'/music'}>
          <div className="btn-hover-yellow border-b-[4px] border-white">
            음악
          </div>
        </Link>
        <Link to={'/exercise'}>
          <div className="btn-hover-yellow border-b-[4px] border-white">
            운동
          </div>
        </Link>
        <Link to={'/cooking'}>
          <div className="btn-hover-yellow border-b-[4px] border-white">
            요리
          </div>
        </Link>
        <Link to={'/game'}>
          <div className="btn-hover-yellow border-b-[4px] border-white">
            게임
          </div>
        </Link>
        <Link to={'/movie'}>
          <div className="btn-hover-yellow border-b-[4px] border-white">
            영화
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainGNB;
