import { useLocation } from 'react-router-dom';
import CategoryCardList from '../components/category/CategoryCardList';

const PaintingPage = () => {
  const location = useLocation();
  const category = location.pathname.split('/').pop() || '';

  return (
    <div className="flex flex-col items-center w-full p-12">
      <CategoryCardList category={category} />
    </div>
  );
};

export default PaintingPage;
