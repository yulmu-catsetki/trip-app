"use client"

import { useEffect,useState,useRef } from 'react';
import { usePathname,useRouter } from 'next/navigation';
import Button from '@/app/components/utils/Button';
export default function Home() {
  // todo : memo db에서 memo 불러오기
  const router = useRouter();
  const [memo, setMemo] = useState('');
  const [file, setFile] = useState([]);
  const pathname = usePathname();
  const memoId = pathname.replace('/memos/', '');
  // 일단 임시로 이렇게 해둘게요 
  const [username, setUsername] = useState('j');
  const [password, setPassword] = useState('j');
  const [imageUrl, setImageUrl] = useState('');
  const [token,setToken]=useState('');
  const fileInput = useRef<HTMLInputElement>(null);

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
          const imageId = data.images[0]; // Get the first image ID
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
      formData.append('travel_id', '665db1465147894c5b2073d5'); 
      const files = fileInput.current?.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
        }
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
        const errorData = await response.json();
        throw new Error('Failed to save memo');
      }
      const data = await response.json();
      console.log(data);
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
        <input type="file" ref={fileInput} multiple />
        <img
          src={imageUrl}
          alt="Description of the image"
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
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
