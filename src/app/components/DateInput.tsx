"use client"

import React from 'react';

interface DateInputProps {
  prop: string;
  className?: string;
  bStyle?: React.CSSProperties;
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ prop, className, bStyle, startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start py-0 px-4 box-border max-w-full text-left text-base text-green-primary font-ui-16-semi ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[7px] max-w-full">
        <b
          className="relative font-semibold inline-block min-w-[68px]"
          style={{ ...bStyle, color: '#5db075' }}
        >
          {prop}
        </b>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="self-stretch text-black bg-slate-100 relative rounded-lg max-w-full overflow-hidden max-h-full"
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="self-stretch text-black bg-slate-100 relative rounded-lg max-w-full overflow-hidden max-h-full"
        />
      </div>
    </div>
  );
};

export default DateInput;