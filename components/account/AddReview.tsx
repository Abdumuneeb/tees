'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../ui/Card';
import ControlledRating from '../ui/ControlledRating';
import LoadingButton from '../ui/LoadingButton';
import useFetch from '@/utils/useFetch';

interface Props {
  orderProductId: number;
  productId: number;
  orderCode: string;
}

export default function AddReview({ orderProductId, productId, orderCode }: Props) {
  const router = useRouter();
  const [rating, setRating] = useState<number>(1);
  const [review, setReview] = useState('');
  const { mutate, isLoading } = useFetch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating) {
      mutate({
        url: '/api/addProductReview',
        method: 'POST',
        body: {
          rating,
          review,
          orderProductId,
          productId,
        },
        messages: {
          loading: 'Adding Review...',
          success: 'Review Added!',
        },
        onSuccess: () => {
          router.push(`/account/${orderCode}`);
        },
      });
    }
  };

  return (
    <Card title='Add Review'>
      <form onSubmit={handleSubmit}>
        <div className='mb-2 flex flex-col space-y-2'>
          <label htmlFor='rating' className='font-medium'>
            Your Rating:
          </label>
          <ControlledRating value={rating} onChange={(index: number) => setRating(index)} />
        </div>
        <div className='mb-2 flex flex-col space-y-2'>
          <label htmlFor='review' className='font-medium'>
            Your Review:
          </label>
          <textarea
            id='review'
            placeholder='Write Review...'
            className='w-full resize-none'
            value={review}
            onChange={e => setReview(e.target.value)}
          />
        </div>
        <div className='flex justify-end'>
          <LoadingButton isLoading={isLoading} className='btn-2 px-3 py-1.5'>
            Add Review
          </LoadingButton>
        </div>
      </form>
    </Card>
  );
}
