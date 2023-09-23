import { Dispatch, SetStateAction, useMemo } from 'react';

interface Props {
  filteredColors: [];
  selectedColor: number | undefined;
  setSelectedColor: Dispatch<SetStateAction<number | undefined>>;
}

export const SelectColor = ({ filteredColors, selectedColor, setSelectedColor }: Props) => {
  return (
    <div className='mb-2'>
      <div className='mb-1 text-lg font-semibold'>Colors</div>
      <div className='grid gap-4 px-1 pb-2 [grid-template-columns:repeat(auto-fit,minmax(2rem,2rem))]'>
        {filteredColors?.map((color: any) => (
          <input
            key={color.id}
            type='checkbox'
            className='h-8 w-8 cursor-pointer rounded-full'
            style={{
              backgroundColor: color.code,
            }}
            checked={selectedColor === color.id}
            onChange={e => setSelectedColor(color.id)}
            title={color.title}
          />
        ))}
      </div>
    </div>
  );
};
