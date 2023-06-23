import Skeleton from '../ui/Skeleton';

export default function CategoryCardSkeleton() {
  return (
    <div className='rounded border border-platinum bg-white p-4 hover:shadow-md'>
      <Skeleton className='mx-auto mb-4 h-7 w-full' />
      <Skeleton className='mx-auto h-56 w-full sm:h-80' />
    </div>
  );
}
