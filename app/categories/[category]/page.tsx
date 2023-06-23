'use client';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import CategoryCard from '@/components/common/CategoryCard';
import CategoryCardSkeleton from '@/components/common/CategoryCardSkeleton';
import CategoriesPanel from '@/components/common/CategoriesPanel';

export default function SubCategories() {
  const pathname = usePathname();
  const { data: categories, isLoading } = useSWR(`/api/getSubCategories/${pathname?.split('/')[2]}`, fetcher);

  return (
    <div className='bg-anti-flash-white py-10'>
      <div className='container flex flex-col gap-8 py-10 lg:flex-row'>
        <CategoriesPanel />
        <div className='flex-1'>
          <h2 className='mb-1 text-center text-3xl font-semibold'>Custom {pathname?.split('/')[2]}</h2>
          <p className='mb-10 text-center text-lg'>Design custom shirts with free & fast shipping</p>
          <div className='grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-y-8 sm:gap-x-6 lg:grid-cols-2 xl:grid-cols-3'>
            {isLoading
              ? Array(5)
                  .fill(null)
                  .map((_, i) => <CategoryCardSkeleton key={i} />)
              : categories?.map((category: { title: string; slug: string; image: string | null }) => (
                  <CategoryCard
                    key={category.slug}
                    title={category.title}
                    slug={pathname + '/' + category.slug}
                    image={category.image}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
