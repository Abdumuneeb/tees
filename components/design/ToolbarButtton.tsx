'use client';

interface Props {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

export default function ToolbarButtton({ icon, label, onClick, isActive, disabled = false }: Props) {
  return (
    <div className='w-fit'>
      <button
        className={`${
          isActive
            ? 'box-shadow border-primary bg-primary text-white'
            : 'border-american-silver text-outer-space-2 hover:border-primary hover:text-primary'
        } mb-1 grid h-[1.875rem] w-[2.875rem] place-content-center rounded-lg border text-lg disabled:text-american-silver disabled:hover:border-american-silver`}
        onClick={onClick}
        disabled={disabled}
      >
        {icon}
      </button>
      <div className='text-center text-[0.625rem] font-bold'>{label}</div>
    </div>
  );
}
