'use client'

import React, { useState, useEffect } from 'react';
import Button from '@/app/components/utils/Button';
import TextInput from '@/app/components/TextInput';
import DateInput from '@/app/components/DateInput';
import Title from "@/app/components/Title";
import { useRouter } from "next/navigation";

const AddTrip = () => {
    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tripLocation, setTripLocation] = useState('');
    const [tripCompanion, setTripCompanion] = useState('');
    const [progress, setProgress] = useState(0);
    const [formComplete, setFormComplete] = useState(false);
    const router = useRouter();

    // 일단 임시로 이렇게 해둘게요 
    const [username, setUsername] = useState('j');
    const [password, setPassword] = useState('j');


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        router.push("/v1/showTripList")
        // todo : db 저장 처리하기 
    };
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
        } catch (error) {
          console.error(error);

        }
      };


    const handleAddTrip = async () => {
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
            const token = tokenData.access_token;  // Adjust this if the token is under a different key

            // Then, use the token to create a travel
            const response = await fetch('https://hci-spring2024.vercel.app/travel/create_travel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: tripName,
                    tripLocation: tripLocation,
                    tripCompanion: tripCompanion, 
                    startDate: startDate, 
                    endDate: endDate, 
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save trip');
            }
            fetchTravels();
            router.push("/v1/showTripList");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const totalFields = 5;
        const filledFields = [tripName, startDate, endDate, tripLocation, tripCompanion].filter(Boolean).length;
        const newProgress = Math.round((filledFields / totalFields) * 100);
        setProgress(newProgress);
        setFormComplete(filledFields === totalFields);
    }, [tripName, startDate, endDate, tripLocation, tripCompanion]);
    return (
        <div className="flex flex-col w-full items-center justify-start h-auto mx-auto">


            <Title text="여행 시작하기" />

            <div className="flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal]">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
                    <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-start gap-[30px]">
                    <TextInput
                        prop="여행이름:"
                        value={tripName}
                        onChange={setTripName}
                        className="w-80"
                    />
                    <DateInput
                        prop="여행기간:"
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        className="w-80"
                    />
                    <TextInput
                        prop="여행장소:"
                        value={tripLocation}
                        onChange={setTripLocation}
                        className="w-80"
                    />
                    <TextInput
                        prop="같이간 사람:"
                        value={tripCompanion}
                        onChange={setTripCompanion}
                        className="w-80"
                    />

                    <Button label="여행 추가하기" onClick={handleAddTrip} disabled={!formComplete} />
                </form>
            </div>
        </div>
    );
};

export default AddTrip;