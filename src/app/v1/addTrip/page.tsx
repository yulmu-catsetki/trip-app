'use client'

import React, { useState } from 'react';
import Button from '@/app/components/Button';
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
    const router = useRouter();
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      router.push("/v1/showTripList")
      // todo : db 저장 처리하기 
    };
  
    return (
        <div className="flex flex-col gap-6 w-full items-center justify-start h-auto mx-auto">
        <Title text="여행 시작하기" /> 
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal]">
          <TextInput
            prop="여행이름:"
            value={tripName}
            onChange={setTripName}
          />
          <DateInput
            prop="여행기간:"
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <TextInput
            prop="여행장소:"
            value={tripLocation}
            onChange={setTripLocation}
          />
          <TextInput
              prop="같이간 사람:"
              value={tripCompanion}
              onChange={setTripCompanion}
          />

      <Button label="여행 추가하기" />
    </form>
    </div>
  );
};

export default AddTrip;