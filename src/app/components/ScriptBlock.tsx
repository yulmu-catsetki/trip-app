import { NextPage } from "next";
import { useRouter } from 'next/navigation';

export type ScriptBlockProps = {
  className?: string;
  title: string;
  modifiedTime: string;
  scriptId: string;
  travelId: string;
};


const ScriptBlock: NextPage<ScriptBlockProps> = ({
  className = "",
  title,
  modifiedTime,
  scriptId,
  travelId
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/scripts/${scriptId}?travelId=${travelId}`);
  };

  const handleDelete = () => {
    handleDeleteScript(scriptId);
  };
  async function handleDeleteScript(scriptId: string) {
    if (window.confirm('Are you sure you want to delete this memo?')) {

    try {
      const tokenResponse = await fetch('https://hci-spring2024.vercel.app/user/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=password&username=${encodeURIComponent("j")}&password=${encodeURIComponent("j")}`
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to get token');
      }

      const tokenData = await tokenResponse.json();
      const token = tokenData.access_token;

      const response = await fetch(`https://hci-spring2024.vercel.app/script/delete_script/${scriptId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete script');
      }
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  }
}

  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-4 mb-4 flex ${className}`}
    >
      <div>
        <div className="flex items-center mb-2">
          <h2 className="text-base font-semibold">{title}</h2>
        </div>
        <p className="text-xs text-gray-500">최종 수정시간 <strong>{modifiedTime}</strong></p>

        <div className="flex items-center gap-2 mt-4 justify-end text-gray-800 ">
          <button onClick={handleClick} className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="edit script" role="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
            </svg>
          </button>
          <button onClick={handleDelete} className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="delete script" role="button">
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

export default ScriptBlock;