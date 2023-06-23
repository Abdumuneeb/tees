import Skeleton from '../ui/Skeleton';

export default function ProductReviewsSkeleton() {
  return (
    <div className='mb-10 bg-anti-flash-white'>
      <div className='container py-10'>
        <h2 className='mb-6 text-2xl font-semibold'>Product Reviews</h2>
        <div className='space-y-10'>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i}>
                <div className='mb-2 flex items-start space-x-2'>
                  <Skeleton className='h-11 w-11 rounded-full' />
                  <div>
                    <Skeleton className='mb-1 h-6 w-40' />
                    <Skeleton className='h-5 w-40' />
                  </div>
                </div>
                <Skeleton className='mb-1 h-[1.125rem] w-40' />
                <Skeleton className='mb-1 h-6 w-full' />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
