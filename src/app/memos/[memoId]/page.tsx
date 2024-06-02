"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';

export default function Home() {
  // todo : memo db에서 memo 불러오기
  const router = useRouter();
  const [memo, setMemo] = useState('');
  function handleMemoChange() {
    setMemo(memo);
    //todo : memo db에 저장
    router.back();
  }

  return (
    <div className="flex flex-col items-center">

      <div className="text-xl my-12">
        <b>
          메모 페이지
        </b>
      </div>
      <div className="flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal]">
        <img
          src="https://cdn.pixabay.com/photo/2021/09/28/13/14/cat-6664412_1280.jpg"
          alt="Description of the image"
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
        <textarea
          className="w-full h-64 p-3 border rounded-md"
          value={memo}
          placeholder="Enter your memo here..."
        />
        <Button label='저장하기' onClick={handleMemoChange} />

      </div>
    </div>
  );
}
