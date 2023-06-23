'use client';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import CategoryCard from '../common/CategoryCard';

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
    <div className='mb-10 bg-anti-flash-white'>
      <div className='container py-10'>
        <h2 className='mb-1 text-center text-3xl font-semibold'>Shop Our Top Categories</h2>
        <p className='mb-10 text-center text-lg'>Our best selling apparel great for any occasion.</p>
        <div className='categories-grid mb-10'>
          {categories?.map((category: { title: string; slug: string; image: string | null }) => (
            <CategoryCard
              key={category.slug}
              title={category.title}
              slug={`/categories/${category.slug}`}
              image={category.image}
            />
          ))}
        </div>
        <div className='flex justify-center'>
          <Link href='/categories' className='btn px-8 py-3'>
            See All Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
