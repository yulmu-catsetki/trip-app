'use client'
import Button from "./components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleAddTripPageClick() {
    router.push("/v1/addTrip")
  }
  function handleShowTripListPageClick() {
    router.push("/v1/showTripList")
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl my-12">
        <b>
          trip app
        </b>
      </div>
      <div className="my-12">
        <Button label="여행 시작하기" onClick={handleAddTripPageClick} active={true} />
      </div>
      <div className="my-0">
        <Button label="여행 기록보기" onClick={handleShowTripListPageClick} active={true} />
      </div>

    </div>
  );
}
