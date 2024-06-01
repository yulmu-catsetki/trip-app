"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MemoBlock from '@/app/components/MemoBlock';
import Title from '@/app/components/Title';
import ScriptBlock from '@/app/components/ScriptBlock';
import Button from '@/app/components/Button';

const TravelPage = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState('list');

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };
  function handleAddScript(){
    //todo : 스크립트 추가 
  }
  function handleMemoSelect(){
    //todo : 메모 선택창 추가  
  }

  return (
    <div className="flex flex-col gap-6 w-full items-center justify-start h-auto mx-auto">
      <Title text="여행 목록보기" /> 
      <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
        <button 
          onClick={() => handleButtonClick('grid')}
          className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-4 py-2 ${activeButton === 'grid' ? 'bg-white text-blue-400 rounded-full' : ''}`}
          id="grid"
        >
          {/* SVG and span elements */}
          <span>사진/메모 보기</span>
        </button>
        <button 
          onClick={() => handleButtonClick('list')}
          className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-r-full px-4 py-2 ${activeButton === 'list' ? 'bg-white text-blue-400 rounded-full' : ''}`}
          id="list"
        >
          {/* SVG and span elements */}
          <span>글 스크립트 보기</span>
        </button>
      </div>

      {activeButton === 'grid' && (
        <div className="flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal]">
        <div className="flex grid grid-cols-3 gap-4">
          <MemoBlock id="1" memoText="Memo 1" image="https://cdn.pixabay.com/photo/2021/09/28/13/14/cat-6664412_1280.jpg" />
          <MemoBlock id="2" memoText="Memo 2" image="https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg" />
          <MemoBlock id="3" memoText="Memo 3" image="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg" />
          <MemoBlock id="3" memoText="Memo 3" image="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg" />
          <MemoBlock id="3" memoText="Memo 3" image="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg" />
        </div>
        <Button label="메모 선택" onClick={handleMemoSelect}/>
        </div>
      )}
      {activeButton === 'list' && (
        <div className="flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal]">
          <ScriptBlock title="Script 1" thumbnail="https://cdn.pixabay.com/photo/2021/09/28/13/14/cat-6664412_1280.jpg" modifiedTime="10:30:00" scriptId="1" />
          <ScriptBlock title="Script 2" thumbnail="https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg" modifiedTime="11:30:00" scriptId="2" />
          <ScriptBlock title="Script 3" thumbnail="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg" modifiedTime="12:30:00" scriptId="3" />
          <Button label="글 작성" onClick={handleAddScript}/>
        </div>
      )}
    </div>
  );
};

export default TravelPage;