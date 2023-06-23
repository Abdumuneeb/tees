import Skeleton from '../ui/Skeleton';

export default function ProductCardSkeleton() {
  return (
    <div className='rounded border border-platinum bg-white p-4 hover:shadow-md'>
      <Skeleton className='h-56 w-full sm:h-80' />
      <div className='mt-4 space-y-1'>
        <Skeleton className='h-[1.75rem] w-full' />
        <Skeleton className='h-[1.75rem] w-full' />
        <Skeleton className='h-[1.75rem] w-full' />
      </div>
    </div>
  );
}
