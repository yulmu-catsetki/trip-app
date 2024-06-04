import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type MemoBlockProps = {
    id: string;
    memoText: string;
    image: string;
    showCheckbox: boolean;
};

const MemoBlock: FC<MemoBlockProps> = ({ id, memoText, image, showCheckbox }) => {
  const router = useRouter();
  const [selectedMemos, setSelectedMemos] = useState<string[]>([]);

  const handleClick = () => {
    router.push(`/memos/${id}`);
  };

  return (
    <div className={`w-50 h-64 flex flex-col justify-between rounded-lg border border-gray-400 mb-6 py-5 px-4 relative ${showCheckbox && !selectedMemos.includes(id) ? 'opacity-50' : ''}`}>
      {showCheckbox && (
        <input
          type="checkbox"
          className="absolute top-2 left-2"
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedMemos([...selectedMemos, id]);
            } else {
              setSelectedMemos(selectedMemos.filter(memoId => memoId !== id));
            }
          }}
        />
      )}
      <div>
        <img src={image} alt="Memo" className="w-full h-32 object-cover rounded-lg" />
        <p className="text-gray-800 text-sm">{memoText}</p>
      </div>
      <div>
        <div className="flex items-center justify-end text-gray-800 ">
          <button  onClick={handleClick} className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="edit note" role="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoBlock;
