'use client';
import { useState } from 'react';

export default function SelectLanguage() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className='grid grid-cols-3'>
      <button
        className={`${
          activeTab === 1 ? 'border-primary font-bold text-primary' : 'border-transparent'
        } border-b-2 py-2 text-sm text-outer-space-2`}
        onClick={() => setActiveTab(1)}
      >
        English
      </button>
      <button
        className={`${
          activeTab === 2 ? 'border-primary font-bold text-primary' : 'border-transparent'
        } border-b-2 py-2 text-sm text-outer-space-2`}
        onClick={() => setActiveTab(2)}
      >
        Greek
      </button>
      <button
        className={`${
          activeTab === 3 ? 'border-primary font-bold text-primary' : 'border-transparent'
        } border-b-2 py-2 text-sm text-outer-space-2`}
        onClick={() => setActiveTab(3)}
      >
        Hebrew
      </button>
    </div>
  );
}
