'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MemoBlock from '@/app/components/MemoBlock';
import Title from '@/app/components/Title';
import ScriptBlock from '@/app/components/ScriptBlock';
import Button from '@/app/components/utils/Button';

const TravelPage = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState('list');
  const [showCheckboxes, setShowCheckboxes] = useState(false);

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

  function handleAddMemoBlock() {
    //todo : 메모 추가 + id도 제대로 만들기
    router.push(`/memos/newmemo`);
  }

  function handleAddScript() {
    //todo : 스크립트 추가 
  }
  function handleCreatePost() {
    //todo : 선택된 메모로 글 작성하기
  }

  const handleMemoSelect = () => {
    setShowCheckboxes(true);
  };
  

  return (
    <div className="flex flex-col gap-6 w-full items-center justify-start h-auto mx-auto">
      <Title text="나의 여행" />
      <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex overflow-hidden">
        <button
          onClick={() => handleButtonClick('grid')}
          className={`inline-flex items-center transition-all duration-300 ease-in hover:text-emerald-500  rounded-full px-4 py-2 ${activeButton === 'grid' ? 'bg-white text-emerald-500' : 'bg-transparent'}`}
          id="grid"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="3" x2="16" y2="21" />
            <line x1="8" y1="3" x2="8" y2="21" />
            <line x1="3" y1="16" x2="21" y2="16" />
            <line x1="3" y1="8" x2="21" y2="8" />
          </svg>
          <span>사진/메모 보기</span>
        </button>
        <button
          onClick={() => handleButtonClick('list')}
          className={`inline-flex items-center transition-all duration-300 ease-in hover:text-emerald-500  rounded-full px-4 py-2 ${activeButton === 'list' ? 'bg-white text-emerald-500' : 'bg-transparent'}`}
          id="list"
        >
         <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3" y2="6" />
            <line x1="3" y1="12" x2="3" y2="12" />
            <line x1="3" y1="18" x2="3" y2="18" />
          </svg>
          <span>글 스크립트 보기</span>
        </button>
      </div>
      {activeButton === 'grid' && (
        <div className="flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal]">
        <div className="flex grid grid-cols-2 gap-4">
          <MemoBlock id="1" memoText="Memo 1" image="https://cdn.pixabay.com/photo/2021/09/28/13/14/cat-6664412_1280.jpg" showCheckbox={showCheckboxes} />
          <MemoBlock id="2" memoText="Memo 2" image="https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg" showCheckbox={showCheckboxes} />
          <MemoBlock id="3" memoText="Memo 3" image="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg" showCheckbox={showCheckboxes} />
          <MemoBlock id="4" memoText="Memo 4" image="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg" showCheckbox={showCheckboxes} />
          <MemoBlock id="5" memoText="Memo 5" image="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg" showCheckbox={showCheckboxes} />
          {!showCheckboxes && (
  <button
    onClick={handleAddMemoBlock}
    className="w-full h-64 flex flex-col justify-center items-center dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            )}
          </div>
          <div className='flex justify-center mb-20'>
            {!showCheckboxes && <Button label="메모 선택" onClick={handleMemoSelect} />}

            {showCheckboxes && <Button label="글생성하기" onClick={handleCreatePost} />}
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
