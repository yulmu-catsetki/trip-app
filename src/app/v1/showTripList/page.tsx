"use client"
import TravelBlock from '@/app/components/TravelBlock';
import { useRouter } from "next/navigation";
import Title from "@/app/components/Title";

const ShowTripList = () => {
  const sampleTravels = [
    { 
      title: 'Trip to Paris', 
      thumbnail: 'https://cdn.pixabay.com/photo/2021/07/30/20/28/montmartre-6510653_1280.jpg', 
      dateFrom: '2022-01-01', 
      dateTo: '2022-01-07',
      travelId: '1',
      place: 'Paris, France',
      companion: 'John Doe'
    },
    { 
      title: 'Trip to New York', 
      thumbnail: 'https://cdn.pixabay.com/photo/2016/11/29/04/19/beach-1867285_1280.jpg', 
      dateFrom: '2022-02-01', 
      dateTo: '2022-02-14',
      travelId: '2',
      place: 'New York, USA',
      companion: 'Jane Doe'
    },
    { 
      title: 'Trip to Tokyo', 
      thumbnail: 'https://cdn.pixabay.com/photo/2019/04/20/11/40/japan-4141581_1280.jpg', 
      dateFrom: '2022-03-01', 
      dateTo: '2022-03-10',
      travelId: '3',
      place: 'Tokyo, Japan',
      companion: 'John Doe'
    },
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
          dateFrom={travel.dateFrom}
          dateTo={travel.dateTo}
          travelId={travel.travelId}
          place={travel.place}
          companion={travel.companion}
        />
      ))}
      </div>
    </div>
  );
};

export default ShowTripList;