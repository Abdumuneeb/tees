import { Dispatch, SetStateAction } from 'react';
import Panel from '../ui/Panel';

interface Props {
  minPrice: string;
  maxPrice: string;
  setMinPrice: Dispatch<SetStateAction<string>>;
  setMaxPrice: Dispatch<SetStateAction<string>>;
}

export default function PriceFilters({ minPrice, maxPrice, setMinPrice, setMaxPrice }: Props) {
  return (
    <Panel label='Price' className='mb-2 border-b'>
      <div className='flex items-center space-x-2 px-1 pb-2'>
        <input
          type='number'
          min={0}
          placeholder='Min Price'
          className='w-32 py-1'
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
        <span>-</span>
        <input
          type='number'
          min={0}
          placeholder='Max Price'
          className='w-32 py-1'
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>
    </Panel>
  );
}
