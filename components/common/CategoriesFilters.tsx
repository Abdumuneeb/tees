import { Dispatch, SetStateAction } from 'react';
import Panel from '../ui/Panel';

interface Props {
  categories: {
    category: {
      title: string;
      slug: string;
      image: string;
    };
    image: string;
  }[];
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}

export default function CategoriesFilters({ categories, selectedCategories, setSelectedCategories }: Props) {
  return (
    <Panel label='Categories' className='mb-2 border-b'>
      <div className='px-1 pb-2'>
        {categories?.map(storeCategory => (
          <div className='flex items-center space-x-2' key={storeCategory.category.slug}>
            <input
              type='checkbox'
              id={storeCategory.category.slug}
              checked={selectedCategories.includes(storeCategory.category.slug)}
              onChange={e =>
                e.target.checked
                  ? setSelectedCategories([...selectedCategories, storeCategory.category.slug])
                  : setSelectedCategories(
                      selectedCategories.filter(category => category !== storeCategory.category.slug)
                    )
              }
            />
            <label htmlFor={storeCategory.category.slug}>{storeCategory.category.title}</label>
          </div>
        ))}
      </div>
    </Panel>
  );
}
