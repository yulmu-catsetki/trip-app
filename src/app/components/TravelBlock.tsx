"use client"

// TravelBlock.tsx
import { NextPage } from "next";
import { useRouter } from 'next/navigation';

export type TravelBlockProps = {
  className?: string;
  title: string;
  thumbnail: string;
  dateFrom: string;
  dateTo: string;
  travelId: string;
  place: string;
  companion: string;
};

const TravelBlock: NextPage<TravelBlockProps> = ({
  className = "",
  title,
  thumbnail,
  dateFrom,
  dateTo,
  travelId,
  place,
  companion
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/travel/${travelId}`);
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-4 mb-4 flex ${className}`}
      onClick={handleClick}
    >
      <img src={thumbnail} alt={title} className="w-32 h-32 object-cover rounded-lg mr-4" />
      <div>
        <div className="flex items-center mb-2">
          <h2 className="text-base font-semibold">{title}</h2>
        </div>
        <p className="text-xs text-gray-500">Date: <strong>{dateFrom} - {dateTo}</strong></p>
        <p className="text-xs text-gray-500">Place: <strong>{place}</strong></p>
        <p className="text-xs text-gray-500">Companion: <strong>{companion}</strong></p>
      </div>
    </div>
  );
};

export default TravelBlock;