'use client'
import Button from "./components/utils/Button";
import { useRouter } from "next/navigation";
import Title from '@/app/components/Title';

export default function Home() {
  const router = useRouter();

  function handleAddTripPageClick() {
    router.push("/v1/addTrip")
  }
  function handleShowTripListPageClick() {
    router.push("/v1/showTripList")
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="mt-20 text-4xl font-bold">
        <p className='text-3xl font-semibold font-sans'>
          여행
          <span className="bg-gradient-to-r from-green-300 via-teal-500 to-emerald-600">
            일기
          </span>
        </p>
      </div>
      

      <div className="flex flex-col items-center gap-[20px] mt-[20px]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="size-20">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
        </svg>

        <Button
          label="여행 시작하기"
          onClick={handleAddTripPageClick}
          className="animate-pulse"
        />
        <Button
          label="여행 기록보기"
          onClick={handleShowTripListPageClick}
        />
      </div>
      <div className="mt-auto mb-10 animate-pulse">
        <p className="text-center text-sm">HCI TEAM 9?</p>
      </div>
    </div>
  );
}