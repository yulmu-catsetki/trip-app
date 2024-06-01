"use client"
import TravelBlock from '@/app/components/TravelBlock';
import { useRouter } from "next/navigation";
import Title from "@/app/components/Title";
const ShowTripList = () => {
  const sampleTravels = [
    { title: 'Trip 1', thumbnail: 'https://cdn.pixabay.com/photo/2023/06/25/11/12/orange-flowers-8087066_1280.jpg', date: '2022-01-01', travelId: '1' },
    { title: 'Trip 2', thumbnail: 'https://cdn.pixabay.com/photo/2022/11/17/12/45/leaves-7597975_1280.jpg', date: '2022-02-01', travelId: '2' },
    { title: 'Trip 3', thumbnail: 'https://cdn.pixabay.com/photo/2024/03/02/13/05/orange-parrots-8608540_1280.jpg', date: '2022-03-01', travelId: '3' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full items-center justify-start h-auto mx-auto">
      <Title text="여행 목록보기" /> 
      <div className="flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal]">
      
      {sampleTravels.map((travel, index) => (
        <TravelBlock
          key={index}
          title={travel.title}
          thumbnail={travel.thumbnail}
          date={travel.date}
          travelId={travel.travelId}
        />
      ))}
      </div>
    </div>
  );
};

export default ShowTripList;