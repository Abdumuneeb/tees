import Panel from '../ui/Panel';
import Skeleton from '../ui/Skeleton';

interface Props {
  label: string;
  items?: number;
}

export default function PanelSkeleton({ label, items = 5 }: Props) {
  return (
    <Panel label={label} className='mb-2 border-b'>
      <div className='space-y-1 px-1 pb-2'>
        {Array(items)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className='h-6 w-full' />
          ))}
      </div>
    </Panel>
  );
}
