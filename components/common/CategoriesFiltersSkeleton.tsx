import Panel from '../ui/Panel';
import Skeleton from '../ui/Skeleton';

export default function CategoriesFiltersSkeleton() {
  return (
    <Panel label='Categories' className='mb-2 border-b'>
      <div className='space-y-1 px-1 pb-2'>
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className='h-6 w-full' />
          ))}
      </div>
    </Panel>
  );
}
