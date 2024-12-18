import { HobbyData } from '../../types';

interface HobbyDataProps {
  hobby: HobbyData;
}

const HobbyCard = ({ hobby }: HobbyDataProps) => {
  const { id, title, views, likes, description, imageUrl } = hobby;

  return (
    <div key={id} className="w-64">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-64 h-64 rounded-xl" />
      ) : (
        <div className="bg-yellow w-64 h-64 rounded-xl" />
      )}
      <div className="flex flex-col p-4 gap-2">
        <div className="flex font-bold text-lg">{title}</div>
        <div className="flex text-left">{description}</div>
        <div className="flex gap-4">
          <div>좋아요 {likes}</div>
          <div>조회수 {views}</div>
        </div>
      </div>
    </div>
  );
};

export default HobbyCard;
