import { useLocation } from 'react-router-dom';
import PopularCardList from '../components/mainpage/PopularCardList';

const PaintingPage = () => {
  const location = useLocation();
  const category = location.pathname.split('/').pop() || '';

  return (
    <div className="flex flex-col items-center w-full p-12">
      <PopularCardList category={category} />
    </div>
  );
};

export default PaintingPage;
