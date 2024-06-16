"use client"
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/app/components/utils/Button';
export default function Home() {
  const [showButton, setShowButton] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const script_id = pathname.replace('/scripts/', '');


  const [title, setTitle] = useState("Blog Title Here");
  const [date, setDate] = useState("Published on April 4, 2023");
  const [content, setContent] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed sit amet feugiat eros, eget eleifend dolor. Proin maximus bibendum felis, id fermentum odio vestibulum id. Sed ac ligula eget dolor consequat tincidunt. Nullam fringilla ipsum et ex lacinia, at bibendum elit posuere. Aliquam eget leo nec nibh mollis consectetur.");


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
        if (script_id != "new") {
          const response = await fetch(`https://hci-spring2024.vercel.app/script/get_script/${script_id}`, {
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
          setDate(data.created_at);
          setContent(data.content[0].text);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchScript();
  }, [script_id, username, password]);

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
        content: [{ "text": content,"type":"text" },],
        travel_id: "665db1465147894c5b2073d5"
      };

      let url = 'https://hci-spring2024.vercel.app/script/create_script';
      let method = 'POST';

      if (script_id != "new") {
        url = `https://hci-spring2024.vercel.app/script/update_script/${script_id}`;
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
      const script_content = [
        {
          "type": "text",
          "text": content,
        },
      ];
      const tokenData = await tokenResponse.json();
      const token = tokenData.access_token;
      const response = await fetch(`https://hci-spring2024.vercel.app/assistant/create_message/${script_id}`, {
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
            <input className="text-gray-600" value={date} onChange={e => setDate(e.target.value)} />
            <textarea className="" value={content} onChange={e => setContent(e.target.value)} />
          </div>
          <div className="w-full md:w-1/4 px-4">
            {showButton && (
              <div className="bg-gray-100 p-4 mt-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">AI Assist</h2>
                <Button
                  onClick={handleAIAssistant}
                  label="Activate"
                >
                </Button>
                {responseData && (
                  <div>
                    <h2>Questions:</h2>
                    <ul>
                      {(responseData as { questions: string[] }).questions.map((question, index) => (
                        <li key={index}>{question}</li>
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