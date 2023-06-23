'use client';
import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { MdSort } from 'react-icons/md';
import { BiFilterAlt } from 'react-icons/bi';
import fetcher from '@/utils/fetcher';
import CategoriesFilters from '@/components/common/CategoriesFilters';
import ColorsFilters from '@/components/common/ColorsFilters';
import PriceFilters from '@/components/common/PriceFilters';
import SizesFilters from '@/components/common/SizesFilters';
import ProductCard from '@/components/common/ProductCard';
import PanelSkeleton from '@/components/common/PanelSkeleton';
import ProductCardSkeleton from '@/components/common/ProductCardSkeleton';

interface Product {
  store: {
    name: string;
  };
  slug: string;
  title: string;
  thumbnail: string;
  unitPrice: number;
  sellPrice: number;
  discount: number;
  description: string;
  Review: {
    rating: number;
  }[];
}

export default function CategoryProducts() {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const { data: sizes, isLoading: sizesLoading } = useSWR('/api/getSizes/', fetcher);
  const { data: colors, isLoading: colorsLoading } = useSWR('/api/getColors/', fetcher);
  const { data: products, isLoading: productsLoading } = useSWR(
    `/api/getCategoryProducts/${pathname?.split('/')[3]}/?${searchParams?.toString()}`,
    fetcher
  );
  const { data: productsCount } = useSWR(
    `/api/getCategoryProductsCount/${pathname?.split('/')[3]}/?${searchParams?.toString()}`,
    fetcher
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(searchParams?.getAll('size') || []);
  const [selectedColors, setSelectedColors] = useState<string[]>(searchParams?.getAll('color') || []);
  const [minPrice, setMinPrice] = useState((searchParams?.get('minPrice') as string | undefined) || '');
  const [maxPrice, setMaxPrice] = useState((searchParams?.get('maxPrice') as string | undefined) || '');
  const [sort, setSort] = useState((searchParams?.get('sort') as string | undefined) || 'priceasc');

  return (
    <div className='my-10'>
      <div className='container flex flex-col gap-8 py-10 lg:flex-row'>
        <div className='lg:w-80'>
          {sizesLoading ? (
            <PanelSkeleton label='Sizes' />
          ) : (
            <SizesFilters sizes={sizes} selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes} />
          )}
          {colorsLoading ? <PanelSkeleton label='Colors' items={2} /> : null}
          <PriceFilters minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
          <button
            className='btn-2 mt-2 flex items-center space-x-1 px-4 py-1.5'
            onClick={() =>
              router.push(
                `${pathname}?minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}${
                  selectedColors.length > 0 ? selectedColors.map(el => `&color=${el}`).join('') : ''
                }${selectedSizes.length > 0 ? selectedSizes.map(el => `&size=${el}`).join('') : ''}&page=1`
              )
            }
          >
            <BiFilterAlt className='text-lg' />
            <span>Apply Filters</span>
          </button>
        </div>
        <div className='flex-1 pt-1'>
          <h2 className='mb-2 text-center text-3xl font-semibold'>Products</h2>
          <div className='mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
            <div>
              Showing <span className='font-semibold'>{(currentPage - 1) * 12}</span> to{' '}
              <span className='font-semibold'>{Math.min(currentPage * 12, productsCount || 0)}</span> of{' '}
              <span className='font-semibold'>{productsCount || 0}</span>
            </div>
            <div className='flex items-center space-x-1'>
              <MdSort className='text-xl' />
              <span>Sort</span>
              <select
                className='py-1'
                value={sort}
                onChange={e => {
                  setSort(e.target.value);
                  router.push(
                    `${pathname}?minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${e.target.value}${
                      selectedColors.length > 0 ? selectedColors.map(el => `&color=${el}`).join('') : ''
                    }${selectedSizes.length > 0 ? selectedSizes.map(el => `&size=${el}`).join('') : ''}&page=1`
                  );
                }}
              >
                <option value='priceasc'>Lowest to Highest Price</option>
                <option value='pricedesc'>Highest to Lowest Price</option>
              </select>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-y-8 sm:gap-x-6 lg:grid-cols-2 xl:grid-cols-3'>
            {productsLoading
              ? Array(5)
                  .fill(null)
                  .map((_, i) => <ProductCardSkeleton key={i} />)
              : products?.map((product: Product) => (
                  <ProductCard
                    key={product.slug}
                    slug={product.slug}
                    title={product.title}
                    price={product.sellPrice}
                    reviews={product.Review}
                    image={product.thumbnail}
                    discount={product.discount}
                  />
                ))}
          </div>
          {productsCount === 0 && <div className='text-center'>No Products Found</div>}
          <div className='mt-4 flex justify-end space-x-2'>
            <button
              className='btn-2 mt-2 flex items-center px-4 py-1.5'
              disabled={!(currentPage > 1)}
              onClick={() =>
                router.push(
                  `${pathname}?minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}${
                    selectedColors.length > 0 ? selectedColors.map(el => `&color=${el}`).join('') : ''
                  }${selectedSizes.length > 0 ? selectedSizes.map(el => `&size=${el}`).join('') : ''}&page=${
                    currentPage - 1
                  }`
                )
              }
            >
              <MdNavigateBefore className='text-xl' />
              <span>Previous</span>
            </button>
            <button
              className='btn-2 mt-2 flex items-center px-4 py-1.5'
              disabled={!(Math.ceil((productsCount || 0) / 12) > currentPage)}
              onClick={() =>
                router.push(
                  `${pathname}?minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}${
                    selectedColors.length > 0 ? selectedColors.map(el => `&color=${el}`).join('') : ''
                  }${selectedSizes.length > 0 ? selectedSizes.map(el => `&size=${el}`).join('') : ''}&page=${
                    currentPage + 1
                  }`
                )
              }
            >
              <span>Next</span>
              <MdNavigateNext className='text-xl' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
