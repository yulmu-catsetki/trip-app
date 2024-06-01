'use client'
import React from 'react';
import { useRouter } from "next/navigation";

interface TextInputProps {
  prop: string;
  className?: string;
  bStyle?: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ prop, className, bStyle, value, onChange }) => {
    return (
      <div
        className={`self-stretch flex flex-row items-start justify-start py-0 px-4 box-border max-w-full text-left text-base font-ui-16-semi ${className}`}
      >
        <div className="flex-1 flex flex-col items-start justify-start max-w-full"> {}
                <b
                    className="relative font-semibold inline-block min-w-[68px]"
                    style={{ ...bStyle, color: '#5db075' }}
                >
                    {prop}
                </b>
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="self-stretch text-black relative bg-slate-100 rounded-lg max-w-full overflow-hidden max-h-full"
          />
        </div>
      </div>
    );
  };

export default TextInput;