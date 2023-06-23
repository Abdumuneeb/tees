'use client';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import CategoryCard from '@/components/common/CategoryCard';
import CategoriesPanel from '@/components/common/CategoriesPanel';

export default function Categories() {
  const { data: categories } = useSWR('/api/getParentCategories', fetcher, {
    fallbackData: [
      { title: 'T-SHIRTS', slug: 't-shirts', image: '8000_navy_front.png' },
      { title: 'Sweatshirts & Hoodies', slug: 'sweatshirts-and-hoodies', image: '18500_navy_front.png' },
      { title: "Women's", slug: "women's", image: '66292-1670430572.jpg' },
      { title: 'POLO SHIRTS', slug: 'polo-shirts', image: null },
      { title: 'HATS', slug: 'hats', image: '23995-1670344881.png' },
      { title: 'Brands', slug: 'brands', image: null },
      { title: 'JACKETS', slug: 'jackets', image: '35432-1670586933.jpg' },
      { title: 'Pants', slug: 'pants', image: '44433-1676953265.jpg' },
    ],
  });

  return (
    <div className='bg-anti-flash-white py-10'>
      <div className='container flex flex-col gap-8 py-10 lg:flex-row'>
        <CategoriesPanel />
        <div className='flex-1'>
          <h2 className='mb-1 text-center text-3xl font-semibold'>Custom Apparel</h2>
          <p className='mb-10 text-center text-lg'>Personalize apparel with free & fast shipping</p>
          <div className='grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-y-8 sm:gap-x-6 lg:grid-cols-2 xl:grid-cols-3'>
            {categories?.map((category: { title: string; slug: string; image: string | null }) => (
              <CategoryCard
                key={category.slug}
                title={category.title}
                slug={`/categories/${category.slug}`}
                image={category.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
