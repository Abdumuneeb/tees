import { BiChevronRight } from 'react-icons/bi';

interface Props {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function TextOption({ label, children, onClick }: Props) {
  return (
    <div
      className='flex cursor-pointer items-center justify-between border-t border-american-silver py-3'
      onClick={onClick}
    >
      <div className='text-sm font-medium'>{label}</div>
      <div className='flex items-center space-x-1'>
        {children}
        {onClick && <BiChevronRight className='text-lg text-primary' />}
      </div>
    </div>
  );
}
