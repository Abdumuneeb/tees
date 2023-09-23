import getAvgRating from '@/utils/getAvgRating';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '../ui/Rating';

interface Props {
  slug: string;
  title: string;
  price: number;
  reviews: {
    rating: number;
  }[];
  image: string | null;
  discount: number;
}

export default function ProductCard({ slug, title, price, reviews, image, discount }: Props) {
  return (
    <Link href={`/products/${slug}`} className='rounded border border-platinum bg-white pt-1 hover:shadow-md'>
      <div className='relative h-56 w-full sm:h-80'>
        <Image
          src={image ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${image}` : ''}
          alt='your design here'
          className='object-contain'
          sizes='(min-width: 1280px) 33vw, 100vw'
          fill
        />
        <div className='absolute mt-[40%] h-11 w-full'>
          <Image
            src={image ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/yourdesign.png` : ''}
            alt=''
            className='object-contain'
            fill
            sizes='(min-width: 1280px) 33vw, 50vw'
          />
        </div>
      </div>
      <div className='mb-4 mt-4 px-1 text-center'>
        <div className='text-lg font-semibold'>{title}</div>
        <div className='text-lg font-bold text-primary'>
          ${' '}
          {discount === 0 ? (
            price
          ) : (
            <span>
              <span className='line-through'>{price}</span> {price - discount}
            </span>
          )}{' '}
          Only
        </div>
        <div className='flex items-center justify-center space-x-2'>
          <Rating rating={getAvgRating(reviews)} />
          <div>({reviews.length})</div>
        </div>
      </div>
    </Link>
  );
}
