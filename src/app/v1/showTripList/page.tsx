"use client"
import React, { useEffect, useState } from 'react';
import TravelBlock from '@/app/components/TravelBlock';
import Title from "@/app/components/Title";

const ShowTripList = () => {
  const [travels, setTravels] = useState<{ id: string, name: string,startDate: string, endDate : string, tripLocation:string,tripCompanion : string }[]>([]);
  const [username, setUsername] = useState('j');
  const [password, setPassword] = useState('j');

  useEffect(() => {
    const fetchTravels = async () => {
      try {

        const tokenResponse = await fetch('https://hci-spring2024.vercel.app/user/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        if (!tokenResponse.ok) {
          throw new Error('Failed to get token');
        }

        const tokenData = await tokenResponse.json();
        const token = tokenData.access_token;


        const response = await fetch('https://hci-spring2024.vercel.app/travel/get_travels', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch travels');
        }

        const data = await response.json();
        setTravels(data);
      } catch (error) {
        console.error(error);
        setTravels([]);
      }
    };

    fetchTravels();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full items-center justify-start h-auto mx-auto">
      <Title text="여행 목록보기" />
      <div className="flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal]">
        {travels.map((travel: { id: string, name: string, startDate: string, endDate: string, tripLocation: string, tripCompanion: string }) => (
          <TravelBlock
            key={travel.id}
            title={travel.name}
            thumbnail="https://cdn.pixabay.com/photo/2020/03/31/10/48/park-4987160_1280.jpg"
            dateFrom={travel.startDate}
            dateTo={travel.endDate}
            place={travel.tripLocation}
            travelId={travel.id}
            companion={travel.tripCompanion}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowTripList;

