"use client"
import { FC } from 'react';
import { useRouter } from 'next/navigation';

type MemoBlockProps = {
    id: string;
    memoText: string;
    image: string;
};

const MemoBlock: FC<MemoBlockProps> = ({ id, memoText, image }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/memos/${id}`);
  };
  return (
    <div onClick={handleClick} className="w-full h-50 bg-slate-100 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:shadow-2xl hover:shadow-slate-400 transition-shadow">
      <div className="w-full h-20 bg-slate-300 rounded-2xl overflow-hidden">
        <img src={image} alt="Memo thumbnail" className="w-full h-20 object-cover" />
      </div>
      <div>
        <p className="font-bold">Card title</p>
        <p>{memoText}</p>
      </div>
    </div>
  );
};
  
  export default MemoBlock;