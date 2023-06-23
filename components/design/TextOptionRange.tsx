'use client';

import { type ChangeEvent } from 'react';

interface Props {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextOptionRange({ label, min, max, step, value, onChange }: Props) {
  return (
    <div className='flex items-center space-x-4 border-t border-american-silver py-3'>
      <div className='w-24 text-sm font-medium'>{label}</div>
      <input
        type='range'
        className='h-[1px] flex-1 cursor-pointer'
        value={value}
        onChange={e => onChange(e)}
        min={min}
        max={max}
        step={step}
      />
      <input type='text' className='h-6 w-[3.125rem] border-american-silver text-center text-xs' value={value} />
    </div>
  );
}
