'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import MemoBlock from '@/app/components/MemoBlock';
import Title from '@/app/components/Title';
import ScriptBlock from '@/app/components/ScriptBlock';
import Button from '@/app/components/utils/Button';

const TravelPage = () => {
  const router = useRouter();
  const [memos, setMemos] = useState([]);
  const [scripts, setScripts] = useState([]);
  const [selectedMemos, setSelectedMemos] = useState([]);

  const [activeButton, setActiveButton] = useState('grid');
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const pathname = usePathname();
  const travelId = pathname.replace('/travel/', '');

  // 일단 임시로 이렇게 해둘게요 
  const [username, setUsername] = useState('j');
  const [password, setPassword] = useState('j');

  const handleMemoSelectionChange = (id: string, isSelected: boolean) => {
    setSelectedMemos(prevState => ({ ...prevState, [id]: isSelected }));
  };

  useEffect(() => {
    const fetchMemos = async () => {
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

        const response = await fetch(`https://hci-spring2024.vercel.app/memo/get_memos/${travelId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch memo');
        }
        const data = await response.json();
        data.forEach((memo: { images: string | any[]; imageUrl: string; }) => {
          if (memo.images && memo.images.length > 0) {
            const imageId = memo.images[0];
            memo.imageUrl = `https://hci-spring2024.vercel.app/image/${imageId}`;
          }
        });

        setMemos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMemos();
  }, []);
  
  useEffect(() => {
    const fetchScripts = async () => {
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

        const response = await fetch('https://hci-spring2024.vercel.app/script/get_scripts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch scripts');
        }

        const data = await response.json();
        setScripts(data);
      } catch (error) {
        console.error(error);
      }

    };

    fetchScripts();
  }, []);


  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };


  function handleAddMemoBlock() {
    router.push(`/memos/new?travelId=${travelId}`);
  }

  function handleAddScript() {
    router.push('/scripts/new?travelId=${travelId}');
  }
  async function handleCreatePost() {
    try {
      const selectedMemoTexts = memos
      .filter((memo: { id: string }) => selectedMemos[memo.id as unknown as number])
      .map((memo: { text: string }) => memo.text)
      .join('\n');
      console.log(selectedMemoTexts);

      // Fetch the token
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
  
      // Make a POST request to the script creation API
      const response = await fetch('https://hci-spring2024.vercel.app/script/create_script', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'New Script from Selected Memos',
          content: [{ "text": selectedMemoTexts,"type":"text" },],
          travel_id: travelId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create script');
      }
  
      const scriptData = await response.json();
  
      // Navigate to the script page
      router.push(`/scripts/${scriptData.id}`);
    } catch (error) {
      console.error(error);
    }
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
          <span>내 여행 메모</span>
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
          <span>내 여행 다이어리</span>
        </button>
      </div>
      {activeButton === 'grid' && (
        <div className="flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal]">
          <div className="flex grid grid-cols-2 gap-4">
            {memos.map((memo: { id: string; text: string; imageUrl: string }) => (
        
              <MemoBlock
                key={memo.id}
                id={memo.id}
                memoText={memo.text}
                image={memo.imageUrl}
                showCheckbox={showCheckboxes}
                onSelectionChange={handleMemoSelectionChange} 
                isSelected={false}              
                />
            ))}
            {!showCheckboxes && (
              <button
                onClick={handleAddMemoBlock}
                className="w-full h-64 flex flex-col justify-center items-center rounded-lg border border-gray-400 mb-6 py-5 px-4"
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
          {scripts.map((script: { id: string; title: string; updated_at: string }) => (
            <ScriptBlock
              key={script.id}
              title={script.title}
              modifiedTime={script.updated_at}
              scriptId={script.id}
            />
          ))}
          <Button label="글 작성" onClick={handleAddScript} />
        </div>
      )}
    </div>
  );
};

export default TravelPage;
