import { useParams } from 'react-router-dom';

const HobbyDetailPage = () => {
  const { id } = useParams();

  console.log('상세페이지 렌더링 됨');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Hobby 상세 페이지</h1>
      <p>게시물 ID: {id}</p>
      {/* 이곳에 Firestore에서 id 기반 데이터 불러오는 로직 넣으면 됨 */}
    </div>
  );
};

export default HobbyDetailPage;
