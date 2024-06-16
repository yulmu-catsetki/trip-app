"use client"

import { useEffect,useState,useRef, ChangeEventHandler } from 'react';
import { usePathname,useRouter,useSearchParams  } from 'next/navigation';
import Button from '@/app/components/utils/Button';
export default function Home() {

  const router = useRouter();
  const [memo, setMemo] = useState('');
  const searchParams = useSearchParams();
  const travelId = searchParams.get('travelId');
  const pathname = usePathname();
  const memoId = pathname.replace('/memos/', '');
  // 일단 임시로 이렇게 해둘게요 
  const [username, setUsername] = useState('j');
  const [password, setPassword] = useState('j');
  const [imageUrl, setImageUrl] = useState('');
  const [token,setToken]=useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setImageUrl(imageUrl);
    }
  };
  useEffect(() => {
    const getAccessToken = async () => {
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
        setToken(tokenData.access_token);

      } catch (error) {
        console.error(error);
      }
    };
    getAccessToken();

  }, [memoId]);

  useEffect(() => {
    const fetchMemo = async () => {
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

        const response = await fetch(`https://hci-spring2024.vercel.app/memo/get_memo/${memoId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch memo');
        }

        const data = await response.json();
        setMemo(data.text);
        if (data.images && data.images.length > 0) {
          const imageId = data.images[0]; 
          setImageUrl(`https://hci-spring2024.vercel.app/image/${imageId}`); 
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (memoId === 'new') return;
    fetchMemo();
  }, [memoId]);
  const handleMemoChange = async () => {
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

      const formData = new FormData();
      formData.append('text', memo);
      if (travelId !== null) {
        formData.append('travel_id', travelId);
      }
      const files = fileInput.current?.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
        }
      }else{
        formData.append('files',"[]");
      }
      const url = memoId === 'new' ? 'https://hci-spring2024.vercel.app/memo/create_memo' : `https://hci-spring2024.vercel.app/memo/update_memo/${memoId}`;
      const method = memoId === 'new' ? 'POST' : 'PUT';
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to save memo');
      }
      const data = await response.json();
      console.log(data);
      // After saving a new memo
      if (memoId === 'new') {
        window.alert('Memo added successfully');
      }

      // After updating an existing memo
      else {
        window.alert('Memo updated successfully');
      }
    } catch (error) {
      console.error(error);
    }
    router.back();
  };

  return (
    <div className="flex flex-col items-center">

      <div className="text-xl my-12">
        <b>
          메모 페이지
        </b>
      </div>
      <div className="flex flex-col items-center justify-start gap-[30px] leading-[normal] tracking-[normal]">
        <input type="file" ref={fileInput} multiple onChange={handleFileChange} />
        {imageUrl && (
          <img
            src={imageUrl}
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />
        )}
        <textarea
          className="w-full h-64 p-3 border rounded-md"
          value={memo}
          placeholder="Enter your memo here..."
          onChange={(e) => setMemo(e.target.value)}
        />
        <Button label={memoId === 'new' ? 'Create' : 'Update'} onClick={handleMemoChange} />

      </div>
    </div>
  );
}
