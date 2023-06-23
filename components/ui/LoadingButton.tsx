import { ReactNode } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

interface Props {
  isLoading: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

export default function LoadingButton({ isLoading, onClick, className, children, disabled }: Props) {
  return (
    <button
      className={`${className} flex items-center justify-center space-x-1`}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading && <BiLoaderAlt className='animate-spin text-lg' />}
      <span>{children}</span>
    </button>
  );
}
