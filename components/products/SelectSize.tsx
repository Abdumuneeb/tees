import { Dispatch, SetStateAction, useMemo } from 'react';

interface Props {
  filteredSizes: [];
  selectedSize: number | undefined;
  setSelectedSize: Dispatch<SetStateAction<number | undefined>>;
}

export const SelectSize = ({ filteredSizes, selectedSize, setSelectedSize }: Props) => {
  return (
    <div className='mb-6'>
      <label htmlFor='size' className='mb-1 block text-lg font-semibold'>
        Size
      </label>
      <select
        className='py-1.5'
        id='size'
        value={selectedSize}
        defaultValue=''
        onChange={e => setSelectedSize(parseInt(e.target.value))}
      >
        <option value='' disabled>
          Select Size
        </option>
        {filteredSizes?.map((size: any) => (
          <option key={size.id} value={size.id}>
            {size.title}
          </option>
        ))}
      </select>
    </div>
  );
};
