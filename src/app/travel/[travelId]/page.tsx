"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MemoBlock from '@/app/components/MemoBlock';
import Title from '@/app/components/Title';
import ScriptBlock from '@/app/components/ScriptBlock';
import Button from '@/app/components/utils/Button';

const TravelPage = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState('list');

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  const exampleScript1 = {
    title: "Example Script 1",
    thumbnail: "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg",
    modifiedTime: "2022-01-01",
    scriptId: "1",
    previewText: "This is a preview of Example Script 1..."
  };

  const exampleScript2 = {
    title: "Example Script 2",
    thumbnail: "https://cdn.pixabay.com/photo/2021/09/28/13/14/cat-6664412_1280.jpg",
    modifiedTime: "2022-01-02",
    scriptId: "2",
    previewText: "This is a preview of Example Script 2..."
  };
  function handleAddMemoBlock(){
    //todo : 메모 추가 + id도 제대로 만들기
    router.push(`/memos/newmemo`);
  }
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
          className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-emerald-500 focus:text-emerald-500 rounded-full px-4 py-2 ${activeButton === 'grid' ? 'bg-white text-emerald-500' : ''}`}
          id="grid"
        >
          {/* SVG and span elements */}
          <span>사진/메모 보기</span>
        </button>
        <button
          onClick={() => handleButtonClick('list')}
          className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-emerald-500 focus:text-emerald-500 rounded-full px-4 py-2 ${activeButton === 'list' ? 'bg-white text-emerald-500' : ''}`}
          id="list"
        >
          {/* SVG and span elements */}
          <span>글 스크립트 보기</span>
        </button>
      </div>

      {activeButton === 'grid' && (
        <div className="flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal]">
        <div className="flex grid grid-cols-2 gap-4">
          <MemoBlock id="1" memoText="Memo 1" image="https://cdn.pixabay.com/photo/2021/09/28/13/14/cat-6664412_1280.jpg" />
          <MemoBlock id="2" memoText="Memo 2" image="https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg" />
          <MemoBlock id="3" memoText="Memo 3" image="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg" />
          <MemoBlock id="3" memoText="Memo 3" image="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg" />
          <MemoBlock id="3" memoText="Memo 3" image="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg" />
        </div>
        <div className='flex justify-center gap-4'>
        <Button label="메모 추가" onClick={handleAddMemoBlock}/>
        <Button label="메모 선택" onClick={handleMemoSelect}/>
        </div>

        </div>
      )}
      {activeButton === 'list' && (
        <div className="flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal]">
                <ScriptBlock {...exampleScript1} />
                <ScriptBlock {...exampleScript2} />
          <Button label="글 작성" onClick={handleAddScript}/>
        </div>
      )}
    </div>
  );
};

export default TravelPage;