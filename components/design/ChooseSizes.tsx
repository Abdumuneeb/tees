'use client';
import PanelHeader from './PanelHeader';

interface Props {
  sizeQuantities: { [key: string]: number };
  setSizeQuantities: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

const sizes = [
  { id: 1, title: 'XS', slug: 'xs' },
  { id: 2, title: 'Small', slug: 'small' },
  { id: 3, title: 'Medium', slug: 'medium' },
  { id: 4, title: 'Large', slug: 'large' },
  { id: 5, title: 'XL', slug: 'xl' },
  { id: 6, title: '2XL', slug: '2xl' },
  { id: 7, title: '3XL', slug: '3xl' },
  { id: 8, title: '4XL', slug: '4xl' },
  { id: 9, title: '5XL', slug: '5xl' },
  { id: 10, title: '6XL', slug: '6xl' },
];

export default function ChooseSizes({ sizeQuantities, setSizeQuantities }: Props) {
  const handleQuantityChange = (sizeId: string, quantity: number) => {
    setSizeQuantities(prevQuantities => ({
      ...prevQuantities,
      [sizeId]: quantity,
    }));
  };

  return (
    <div className='rounded-lg bg-anti-flash-white p-8'>
      <PanelHeader
        title='Quantity & Sizes'
        subTitle='Choose Quantity & Sizes'
        text='Enter quantities to calculate the price. Save money by increasing quantity and reducing ink colors in your design.'
      />
      <div>
        {sizes?.map((size: any) => (
          <div key={size.slug} className='mb-2 grid grid-cols-2 items-center'>
            <label htmlFor={size.id}>{size.title}</label>
            <input
              type='number'
              className='h-6 w-[5ch] px-2'
              value={sizeQuantities[size.id] || 0}
              onChange={e => handleQuantityChange(size.id, parseInt(e.target.value))}
              min={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
