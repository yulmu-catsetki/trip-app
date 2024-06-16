"use client"
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '@/app/components/utils/Button';
export default function Home() {
  const [showButton, setShowButton] = useState(true);
  const router = useRouter();

  const searchParams = useSearchParams();
  const scriptId = usePathname().replace('/scripts/', '');
  const travelId = searchParams.get('travelId');
  const [title, setTitle] = useState("새 일기");
  const [textcontent, settextContent] = useState(" ");
  const [content, setContent] = useState<{
    text: string | number | readonly string[] | undefined;
    img: any; type: string 
}[]>([]);
  const [username, setUsername] = useState('j');
  const [password, setPassword] = useState('j');
  const [token, setToken] = useState('');
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchScript = async () => {
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
        if (scriptId != "new") {
          const response = await fetch(`https://hci-spring2024.vercel.app/script/get_script/${scriptId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch script');
          }
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
          console.log(data.content);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchScript();
  }, [scriptId, username, password]);

  const handleScript = async () => {
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
      console.log(tokenData);
      const token = tokenData.access_token;

      const script = {
        title: title,
        content: content,
        travel_id: travelId,
      };

      let url = 'https://hci-spring2024.vercel.app/script/create_script';
      let method = 'POST';

      if (scriptId != "new") {
        url = `https://hci-spring2024.vercel.app/script/update_script/${scriptId}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(script),
      });

      if (!response.ok) {
        console.log(script);
        const errorData = await response.json();
        throw new Error('Failed to save script');
      }
    } catch (error) {
      console.error(error);
    }
    if (scriptId === 'new') {
      window.alert('script added successfully');
    }

    else {
      window.alert('script updated successfully');
    }
    router.back();
  };
  const handleAIAssistant = async () => {
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
      const script_content = content;
      const tokenData = await tokenResponse.json();
      const token = tokenData.access_token;
      const response = await fetch(`https://hci-spring2024.vercel.app/assistant/create_message/${scriptId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(script_content),
      });
      console.log(script_content);
      if (!response.ok) {

        throw new Error('Failed to activate AI assistant');
      }

      const data = await response.json();
      console.log(data);
      setResponseData(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex flex-col">
      <div className="bg-white py-8">

        <div className="container mx-auto px-4 flex flex-col">
          <div>
            <Button label="Save Script" onClick={handleScript}></Button>
          </div>
          <div className="w-full flex flex-col px-4">
            <input className="text-4xl font-bold text-gray-800 mt-8 mb-8" value={title} onChange={e => setTitle(e.target.value)} />
      
            <div>
              {content.map((item, index) => {
                if (item.type === "img") {
                  return <img key={index} src={`https://hci-spring2024.vercel.app/image/${item.img}`} alt="" style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>;
                }else if (item.type === "text") {
                  return (
                    <div key={index}>
                      <textarea id={`message${index}`}  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={item.text} onChange={e => settextContent(e.target.value)} placeholder="Write your thoughts here..."></textarea>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="w-full md:w-1/4 px-4">
            {showButton && (
              <div className="bg-gray-100 p-4 mt-4">
                <Button
                  onClick={handleAIAssistant}
                  label="추천 질문받기"
                >
                </Button>
                {responseData && (
                  <div>
                    <ul>
                      {(responseData as { questions: string[] }).questions.map((question, index) => (
                        <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                        {question}
                      </div>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}