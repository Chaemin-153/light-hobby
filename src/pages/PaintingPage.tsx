import { useLocation } from 'react-router-dom';
import CardList from '../components/mainpage/CardList';

const PaintingPage = () => {
  const location = useLocation();
  const category = location.pathname.split('/').pop() || '';

  return (
    <div className="flex flex-col items-center w-full p-12">
      <CardList category={category} />
    </div>
  );
};

export default PaintingPage;
