import { Dispatch, SetStateAction, useMemo } from 'react';

interface Props {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

export default function SelectQuantity({ quantity, setQuantity }: Props) {
  return (
    <div className='mb-2'>
      <label htmlFor='quantity' className='mb-1 block text-lg font-semibold'>
        Quantity
      </label>
      <div className='flex items-center space-x-2'>
        <button onClick={() => quantity > 1 && setQuantity(prev => prev - 1)} className='text-xl'>
          -
        </button>
        <input
          id='quantity'
          type='number'
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value))}
          min={1}
          className='w-20 py-1.5'
        />
        <button onClick={() => setQuantity(prev => prev + 1)} className='text-xl'>
          +
        </button>
      </div>
    </div>
  );
}
