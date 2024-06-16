"use client"
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


type MemoBlockProps = {
  id: string;
  travelId: string;
  memoText: string;
  image: string;
  showCheckbox: boolean;
  isSelected: boolean;
  onSelectionChange: (id: string, isSelected: boolean) => void;
};

const MemoBlock: FC<MemoBlockProps> = ({ id, memoText, image, showCheckbox, travelId,onSelectionChange }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(false);

  const [username, setUsername] = useState('j');
  const [password, setPassword] = useState('j');
  const handleClick = () => {
    router.push(`/memos/${id}?travelId=${travelId}`);
  };
  const handleCheckboxChange = () => {
    const newSelectedState = !selected;
    setSelected(newSelectedState);
    onSelectionChange(id, newSelectedState);
  };

  const handleDeleteMemo =async (event: React.MouseEvent<HTMLButtonElement>) => {
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
  
      const response = await fetch(`https://hci-spring2024.vercel.app/memo/delete_memo/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete memo');
      }
      window.location.reload();
  
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={`w-50 h-64 flex flex-col justify-between rounded-lg border border-gray-400 mb-6 py-5 px-4 relative ${showCheckbox && !selected ? 'opacity-50' : ''}`}>
      {showCheckbox && (
        <input
          type="checkbox"
          className="absolute top-2 left-2"
          checked={selected}
          onChange={handleCheckboxChange}
        />

      )}
      <div>
        <img src={image} alt="Memo" className="w-full h-32 object-cover rounded-lg" />
        <p className="text-gray-800 text-sm">{memoText}</p>
      </div>
      <div>
        <div className="flex items-center gap-2 justify-end text-gray-800 ">
          <button onClick={handleClick} className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="edit note" role="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
            </svg>
          </button>
          <button onClick={handleDeleteMemo} className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="delete note" role="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <line x1="4" y1="7" x2="20" y2="7"></line>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoBlock;
