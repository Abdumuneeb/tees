'use client';
import { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { BiMinus, BiPlus } from 'react-icons/bi';

interface Props {
  label: string;
  children: React.ReactNode;
  className?: string;
  initialOpen?: boolean;
}

export default function Panel({ label, children, className, initialOpen = true }: Props) {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div className={className}>
      <button
        className='flex w-full items-center justify-between py-1 hover:text-primary'
        onClick={() => setOpen(!open)}
      >
        <span className='font-semibold lowercase first-letter:uppercase'>{label}</span>
        {open ? <BiMinus className='text-xl' /> : <BiPlus className='text-xl' />}
      </button>
      <AnimateHeight duration={300} height={open ? 'auto' : 0}>
        {children}
      </AnimateHeight>
    </div>
  );
}
