import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Card({ children, title }: Props) {
  return (
    <div className='rounded border'>
      <div className='mb-4 bg-light-gray px-6 py-2 text-xl font-semibold'>{title}</div>
      <div className='mb-4 px-6'>{children}</div>
    </div>
  );
}
