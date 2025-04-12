import { Link } from 'react-router-dom';
import { HobbyData } from '../../types';

interface HobbyDataProps {
  hobby: HobbyData;
}

const HobbyCard = ({ hobby }: HobbyDataProps) => {
  const { id, title, views, likes, description, imageUrl } = hobby;
  const hobbyLink = `/${hobby.category}/${hobby.category + hobby.id}`;

  return (
    <div key={id} className="aspect-square w-full">
      <Link to={hobbyLink}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-64 h-64 rounded-xl object-cover"
          />
        ) : (
          <div className="bg-yellow w-full h-64 rounded-xl" />
        )}
      </Link>
      <div className="flex flex-col p-2 gap-2">
        <p className="text-left font-bold text-lg truncate">{title}</p>
        <p className="text-left mob:hidden line-clamp-3">{description}</p>
        <div className="flex sm:flex-col sm:items-start sm:gap-0 gap-4">
          <div>좋아요 {likes}</div>
          <div>조회수 {views}</div>
        </div>
      </div>
    </div>
  );
};

export default HobbyCard;
