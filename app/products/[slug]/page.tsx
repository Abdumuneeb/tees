'use client';
import { useState, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import ProductImages from '@/components/common/ProductImages';
import Rating from '@/components/ui/Rating';
import { SelectColor } from '@/components/products/SelectColor';
import { SelectSize } from '@/components/products/SelectSize';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProductReviews from '@/components/products/ProductReviews';
import SelectQuantity from '@/components/products/SelectQuantity';
import Skeleton from '@/components/ui/Skeleton';
import ProductReviewsSkeleton from '@/components/products/ProductReviewsSkeleton';
import LoadingButton from '@/components/ui/LoadingButton';
import fetcher from '@/utils/fetcher';
import useFetch from '@/utils/useFetch';

interface Stock {
  color: {
    title: string;
    id: number;
  };
  size: {
    title: string;
    id: number;
  };
  price: number;
  ProductStockImage: {
    fileName: string;
  }[];
  id: number;
}

export default function Product() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<number | undefined>();
  const [selectedSize, setSelectedSize] = useState<number | undefined>();
  const { data: product, isLoading: productLoading } = useSWR(`/api/getProduct/${pathname?.split('/')[2]}`, fetcher);
  const { data: rating, isLoading: ratingLoading } = useSWR(
    `/api/getProductRating/${pathname?.split('/')[2]}`,
    fetcher
  );
  const { data: reviews, isLoading: reviewsLoading } = useSWR(
    `/api/getProductReviews/${pathname?.split('/')[2]}`,
    fetcher
  );
  const { mutate: mutateCart } = useSWR('/api/getCartCount');
  const { mutate: addToCartFunc, isLoading: addToCartLoading } = useFetch();
  const { mutate: buyNowFunc, isLoading: buyNowLoading } = useFetch();

  const filteredColors = useMemo(
    () =>
      product?.ProductStock?.filter((stock: Stock) => stock.color !== null)
        ?.map((stock: Stock) => stock.color)
        ?.filter((value: { id: any }, index: any, self: any[]) => self?.map(x => x?.id)?.indexOf(value?.id) == index),
    [product]
  );

  const filteredSizes = useMemo(
    () =>
      product?.ProductStock?.filter((stock: Stock) => stock.size !== null)
        ?.map((stock: Stock) => stock.size)
        ?.filter((value: { id: any }, index: any, self: any[]) => self?.map(x => x?.id)?.indexOf(value?.id) == index),
    [product]
  );

  const addToCart = async () => {
    if (session?.user) {
      const productStockId = product?.ProductStock.find(
        (stock: Stock) => stock?.color?.id === selectedColor && stock?.size?.id === selectedSize
      )?.id;
      addToCartFunc({
        url: '/api/addToCart',
        method: 'POST',
        body: {
          productSlug: pathname?.split('/')[2],
          productStockId,
          quantity,
        },
        messages: {
          loading: 'Adding to Cart...',
          success: 'Added to Cart',
        },
        onSuccess: () => mutateCart(),
      });
    } else {
      router.push('/login');
    }
  };

  const buyNow = async () => {
    if (session?.user) {
      const productStockId = product?.ProductStock.find(
        (stock: Stock) => stock?.color?.id === selectedColor && stock?.size?.id === selectedSize
      )?.id;
      buyNowFunc({
        url: '/api/addToCart',
        method: 'POST',
        body: {
          productSlug: pathname?.split('/')[2],
          productStockId,
          quantity,
        },
        messages: {
          loading: 'Adding to Cart...',
          success: 'Added to Cart',
        },
        onSuccess: () => {
          mutateCart();
          router.push('/checkout');
        },
      });
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <div className='container my-10 flex flex-col gap-4 md:flex-row'>
        {productLoading ? (
          <Skeleton className='h-[420px] w-[420px]' />
        ) : (
          <ProductImages
            images={[
              product.thumbnail ?? [],
              ...product?.ProductStock.flatMap((stock: Stock) =>
                stock?.ProductStockImage?.flatMap(img => img.fileName)
              ),
            ]}
          />
        )}
        <div>
          {productLoading ? (
            <Skeleton className='mb-2 h-8 w-full' />
          ) : (
            <h1 className='mb-2 text-2xl font-semibold'>{product?.title}</h1>
          )}
          {productLoading ? <Skeleton className='mb-2 h-6 w-full' /> : <div className='mb-2'>SKU: {product?.sku}</div>}
          {ratingLoading ? (
            <Skeleton className='mb-6 h-[1.75rem] w-full' />
          ) : (
            <div className='mb-2 flex items-center space-x-4'>
              <Rating rating={rating._avg.rating} />
              <div>{rating._count.rating} review(s)</div>
            </div>
          )}
          {productLoading ? (
            <Skeleton className='mb-6 h-[1.75rem] w-full' />
          ) : product?.discount === 0 ? (
            <div className='mb-6 text-xl font-bold text-primary'>
              ${' '}
              {product?.ProductStock.find(
                (stock: Stock) => stock?.color?.id === selectedColor && stock?.size?.id === selectedSize
              )?.price || product?.sellPrice}{' '}
              Only
            </div>
          ) : (
            <div className='mb-6 text-xl font-bold text-primary'>
              ${' '}
              {
                <>
                  <span className='line-through'>
                    {product?.ProductStock.find(
                      (stock: Stock) => stock?.color?.id === selectedColor && stock?.size?.id === selectedSize
                    )?.price || product?.sellPrice}
                  </span>{' '}
                  <span>
                    {product?.ProductStock.find(
                      (stock: Stock) => stock?.color?.id === selectedColor && stock?.size?.id === selectedSize
                    )?.price - product?.discount || product?.sellPrice - product?.discount}
                  </span>
                </>
              }{' '}
              Only
            </div>
          )}
          {productLoading ? (
            <Skeleton className='mb-2 h-[4.375rem] w-full' />
          ) : (
            product?.store?.slug && <SelectQuantity quantity={quantity} setQuantity={setQuantity} />
          )}
          {productLoading ? (
            <>
              <Skeleton className='mb-1 h-8 w-full' />
              <Skeleton className='mb-2 h-8 w-full' />
            </>
          ) : (
            <SelectColor
              filteredColors={filteredColors}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          )}
          {productLoading ? (
            <>
              <Skeleton className='mb-1 h-8 w-full' />
              <Skeleton className='mb-2 h-8 w-full' />
            </>
          ) : (
            product?.store?.slug && (
              <SelectSize filteredSizes={filteredSizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
            )
          )}

          <div className='mb-10 flex items-center space-x-2'>
            {product?.store?.slug ? (
              <>
                <LoadingButton
                  isLoading={addToCartLoading}
                  className='btn-2 px-4 py-1.5'
                  onClick={addToCart}
                  disabled={
                    productLoading ||
                    (filteredColors?.length > 0 && !selectedColor) ||
                    (filteredSizes?.length > 0 && !selectedSize)
                  }
                >
                  Add To Cart
                </LoadingButton>
                <LoadingButton
                  isLoading={buyNowLoading}
                  onClick={buyNow}
                  disabled={
                    productLoading ||
                    (filteredColors?.length > 0 && !selectedColor) ||
                    (filteredSizes?.length > 0 && !selectedSize)
                  }
                  className='btn-2 px-4 py-1.5'
                >
                  Buy Now
                </LoadingButton>
              </>
            ) : (
              <LoadingButton
                disabled={!selectedColor}
                isLoading={false}
                onClick={() => router.push(`design/${product?.slug}/${selectedColor}`)}
                className='btn-2 px-4 py-1.5'
              >
                Start Designing
              </LoadingButton>
            )}
          </div>
          <div>
            <div className='text-lg font-semibold'>Product Description</div>
            {productLoading ? (
              <>
                <Skeleton className='mb-1 h-8 w-full' />
                <Skeleton className='mb-1 h-8 w-full' />
                <Skeleton className='mb-1 h-8 w-full' />
              </>
            ) : (
              <div className='prose' dangerouslySetInnerHTML={{ __html: product?.description || '' }} />
            )}
          </div>
        </div>
      </div>
      {reviewsLoading ? <ProductReviewsSkeleton /> : <ProductReviews reviews={reviews} />}
    </>
  );
}
