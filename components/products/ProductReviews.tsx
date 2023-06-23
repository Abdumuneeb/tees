import dayjs from 'dayjs';
import { BsCheck2Circle } from 'react-icons/bs';
import Avatar from '../ui/Avatar';
import Rating from '../ui/Rating';

interface Props {
  reviews: {
    id: number;
    rating: number;
    review: string;
    user: {
      name: string;
      image: string;
    };
    createdAt: string;
  }[];
}

export default function ProductReviews({ reviews }: Props) {
  return (
    <div className='mb-10 bg-anti-flash-white'>
      <div className='container py-10'>
        <h2 className='mb-6 text-2xl font-semibold'>Product Reviews</h2>
        {reviews?.length > 0 ? (
          <div className='space-y-10'>
            {reviews?.map(review => (
              <div key={review.id}>
                <div className='mb-2 flex items-start space-x-2'>
                  <Avatar name={review.user.name} />
                  <div>
                    <div className='flex items-center'>
                      <div className='mr-2 font-semibold'>{review.user.name}</div>
                      <BsCheck2Circle className='mr-0.5 text-green-600' />
                      <div className='text-sm'>Verified Buyer</div>
                    </div>
                    <div className='text-sm'>{dayjs(review.createdAt).format('DD MMM YY')}</div>
                  </div>
                </div>
                <Rating rating={review.rating} className='mb-2' />
                <p>{review.review}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>No Reviews So Far</div>
        )}
      </div>
    </div>
  );
}
