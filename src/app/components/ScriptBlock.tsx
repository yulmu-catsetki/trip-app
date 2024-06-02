import { NextPage } from "next";
import { useRouter } from 'next/navigation';

export type ScriptBlockProps = {
  className?: string;
  title: string;
  thumbnail: string;
  modifiedTime: string;
  scriptId: string;
  previewText: string;
};

const ScriptBlock: NextPage<ScriptBlockProps> = ({
  className = "",
  title,
  thumbnail,
  modifiedTime,
  scriptId,
  previewText
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/scripts/${scriptId}`);
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-4 mb-4 flex ${className}`}
      onClick={handleClick}
    >
      <img src={thumbnail} alt={title} className="w-32 h-32 object-cover rounded-lg mr-4" />
      <div>
        <div className="flex items-center mb-2">
          <h2 className="text-base font-semibold">{title}</h2>
        </div>
        <p className="text-xs text-gray-500">최종 수정시간 <strong>{modifiedTime}</strong></p>
        <p className="text-xs text-gray-500 mt-2">{previewText}</p>
      </div>
    </div>
  );
};

export default ScriptBlock;