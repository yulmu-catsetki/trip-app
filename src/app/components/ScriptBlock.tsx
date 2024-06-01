import { NextPage } from "next";
import { useRouter } from 'next/navigation';

export type ScriptBlockProps = {
  className?: string;
  title: string;
  thumbnail: string;
  modifiedTime: string;
  scriptId: string;
};

const ScriptBlock: NextPage<ScriptBlockProps> = ({
  className = "",
  title,
  thumbnail,
  modifiedTime,
  scriptId
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/scripts/${scriptId}`);
  };

  return (
    <div
      className={`self-stretch w-full flex flex-row items-start justify-between pt-0 px-0 pb-[27px] box-border gap-[16px] text-left text-base text-black font-ui-16-semi ${className}`}
      onClick={handleClick}
    >
      <div className="self-stretch w-[50px] h-[50px] relative rounded-lg bg-whitesmoke shrink-0 [debug_commit:bf4bc93]" style={{ backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover' }} />
      <div className="flex-1 flex flex-row items-center justify-between gap-[33px] shrink-0 [debug_commit:bf4bc93]">
        <b className="relative font-semibold inline-block min-w-[68px]">
          {title}
        </b>
        <a
          className="[text-decoration:none] relative text-[inherit] inline-block min-w-[60px]"
        >
          {modifiedTime}
        </a>
      </div>
      <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-gainsboro" />
    </div>
  );
};

export default ScriptBlock;