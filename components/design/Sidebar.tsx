import { type Dispatch, type SetStateAction } from 'react';
import { IoShirtOutline } from 'react-icons/io5';
import { BiText, BiUpload } from 'react-icons/bi';

interface Props {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  hoveredTab: number;
}

export default function Sidebar({ activeTab, setActiveTab, hoveredTab }: Props) {
  return (
    <div className='z-[1] w-[6.25rem] space-y-2 py-4 shadow-xl'>
      <button
        className={`${
          activeTab === 1 || hoveredTab === 1
            ? 'box-shadow w-28 bg-primary font-bold text-white'
            : 'w-full font-medium hover:text-primary'
        } rounded-lg py-4`}
        onClick={() => setActiveTab(1)}
      >
        <div className='flex w-24 flex-col items-center space-y-1'>
          <IoShirtOutline className='text-2xl' />
          <span className='text-xs'>Products</span>
        </div>
      </button>
      <button
        className={`${
          activeTab === 2 || hoveredTab === 2
            ? 'box-shadow w-28 bg-primary font-bold text-white'
            : 'w-full font-medium hover:text-primary'
        } rounded-lg py-4`}
        onClick={() => setActiveTab(2)}
      >
        <div className='flex w-24 flex-col items-center space-y-1'>
          <BiText className='text-2xl' />
          <span className='text-xs'>Add Text</span>
        </div>
      </button>
      <button
        className={`${
          activeTab === 3 || hoveredTab === 3
            ? 'box-shadow w-28 bg-primary font-bold text-white'
            : 'wfull font-medium hover:text-primary'
        } rounded-lg py-4`}
        onClick={() => setActiveTab(3)}
      >
        <div className='flex w-24 flex-col items-center space-y-1'>
          <BiUpload className='text-2xl' />
          <span className='text-xs'>Upload Art</span>
        </div>
      </button>
    </div>
  );
}
