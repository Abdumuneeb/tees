import { Dispatch, SetStateAction } from 'react';
import Panel from '../ui/Panel';

interface Props {
  colors: {
    title: string;
    slug: string;
    code: string;
  }[];
  selectedColors: string[];
  setSelectedColors: Dispatch<SetStateAction<string[]>>;
}

export default function ColorsFilters({ colors, selectedColors, setSelectedColors }: Props) {
  return (
    <Panel label='Colors' className='mb-2 border-b'>
      <div className='grid grid-cols-8 gap-2 px-1 pb-2'>
        {colors?.map(color => (
          <input
            key={color.slug}
            type='checkbox'
            className='h-8 w-8 rounded-full ring-0'
            style={{
              backgroundColor: color.code,
            }}
            checked={selectedColors.includes(color.slug)}
            onChange={e =>
              e.target.checked
                ? setSelectedColors([...selectedColors, color.slug])
                : setSelectedColors(selectedColors.filter(category => category !== color.slug))
            }
          />
        ))}
      </div>
    </Panel>
  );
}
