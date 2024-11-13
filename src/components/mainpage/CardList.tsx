import { Link } from 'react-router-dom';

const CardList = () => {
  return (
    <div className="flex flex-col gap-8 p-6 mb-8 w-[1200px] border-4 border-yellow rounded-xl">
      {/* CardList Header */}
      <div className="flex justify-between font-bold">
        <h2 className="text-2xl">그림</h2>
        <Link to={'/category/painting'}>
          <div>전체보기</div>
        </Link>
      </div>
      {/* CardList Content */}
      <div className="flex justify-center gap-8">
        {/* Card 1 */}
        <div className="w-64">
          <div className="bg-lime-600 w-64 h-64 rounded-xl">사진 추가 예정</div>
          <div className="flex flex-col p-4 gap-2">
            <div className="flex font-bold text-lg">제목입니다</div>
            <div className="flex text-left">
              설명입니다 설명입니다 설명입니다 설명입니다 설명입니다
            </div>
            <div className="flex gap-4">
              <div>좋아요 2</div>
              <div>조회수 10</div>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="w-64">
          <div className="bg-lime-600 w-64 h-64 rounded-xl">사진 추가 예정</div>
          <div className="flex flex-col p-4 gap-2">
            <div className="flex font-bold text-lg">제목입니다</div>
            <div className="flex text-left">
              설명입니다 설명입니다 설명입니다 설명입니다 설명입니다
            </div>
            <div className="flex gap-4">
              <div>좋아요 2</div>
              <div>조회수 10</div>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="w-64">
          <div className="bg-lime-600 w-64 h-64 rounded-xl">사진 추가 예정</div>
          <div className="flex flex-col p-4 gap-2">
            <div className="flex font-bold text-lg">제목입니다</div>
            <div className="flex text-left">
              설명입니다 설명입니다 설명입니다 설명입니다 설명입니다
            </div>
            <div className="flex gap-4">
              <div>좋아요 2</div>
              <div>조회수 10</div>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="w-64">
          <div className="bg-lime-600 w-64 h-64 rounded-xl">사진 추가 예정</div>
          <div className="flex flex-col p-4 gap-2">
            <div className="flex font-bold text-lg">제목입니다</div>
            <div className="flex text-left">
              설명입니다 설명입니다 설명입니다 설명입니다 설명입니다
            </div>
            <div className="flex gap-4">
              <div>좋아요 2</div>
              <div>조회수 10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardList;
