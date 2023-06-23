'use client';
import useSWR from 'swr';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import CategoryCard from '../common/CategoryCard';
import fetcher from '@/utils/fetcher';
import CategoryCardSkeleton from '../common/CategoryCardSkeleton';

interface Category {
  category: {
    title: string;
    slug: string;
    image: string;
  };
  image: string;
}

function Categories() {
  const pathname = usePathname();
  const { data: categories, isLoading } = useSWR(`/api/getStoreCategories/${pathname?.split('/')[2]}`, fetcher);

  return (
    <div className='bg-anti-flash-white'>
      <div className='container my-10 py-10'>
        <h2 className='mb-1 text-center text-3xl font-semibold'>Top Categories</h2>
        <p className='mb-10 text-center text-lg'>Browse the top categoires of this store</p>
        <div className='categories-grid mb-10'>
          {isLoading
            ? Array(5)
                .fill(null)
                .map((_, i) => <CategoryCardSkeleton key={i} />)
            : categories?.map((storeCategory: Category) => (
                <CategoryCard
                  key={storeCategory.category.slug}
                  title={storeCategory.category.title}
                  slug={`/stores/${pathname?.split('/')[2]}/products?category=${storeCategory.category.slug}`}
                  image={storeCategory.image || storeCategory.category.image}
                />
              ))}
        </div>
        <div className='flex justify-center'>
          <Link href={`/stores/${pathname?.split('/')[2]}/products`} className='btn px-8 py-3 '>
            See All Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Categories;
