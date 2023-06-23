import { Dispatch, SetStateAction } from 'react';
import Panel from '../ui/Panel';

interface Props {
  sizes: {
    title: string;
    slug: string;
  }[];
  selectedSizes: string[];
  setSelectedSizes: Dispatch<SetStateAction<string[]>>;
}

export default function SizesFilters({ sizes, selectedSizes, setSelectedSizes }: Props) {
  return (
    <Panel label='Sizes' className='mb-2 border-b'>
      <div className='px-1 pb-2'>
        {sizes?.map(size => (
          <div className='flex items-center space-x-2' key={size.slug}>
            <input
              type='checkbox'
              id={size.slug}
              checked={selectedSizes.includes(size.slug)}
              onChange={e =>
                e.target.checked
                  ? setSelectedSizes([...selectedSizes, size.slug])
                  : setSelectedSizes(selectedSizes.filter(category => category !== size.slug))
              }
            />
            <label htmlFor={size.slug}>{size.title}</label>
          </div>
        ))}
      </div>
    </Panel>
  );
}
