'use client';

interface Option {
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

interface Props {
  options: Option[];
  label: string;
}

export default function ToolbarButttonGroup({ options, label }: Props) {
  return (
    <div className='w-fit'>
      <div className='flex'>
        <button
          className={`${
            options[0]?.isActive
              ? 'box-shadow border-primary bg-primary text-white'
              : 'border-american-silver text-outer-space-2 hover:border-primary hover:text-primary'
          } mb-1 grid h-[1.875rem] w-[2.875rem] place-content-center rounded-l-lg border text-lg disabled:text-american-silver disabled:hover:border-american-silver`}
          onClick={options[0]?.onClick}
          disabled={options[0]?.disabled || false}
        >
          {options[0].icon}
        </button>
        <div className='w-fit'>
          <button
            className={`${
              options[1]?.isActive
                ? 'box-shadow border-primary bg-primary text-white'
                : 'border-american-silver text-outer-space-2 hover:border-primary hover:text-primary'
            } mb-1 grid h-[1.875rem] w-[2.875rem] place-content-center rounded-r-lg border text-lg disabled:text-american-silver disabled:hover:border-american-silver`}
            onClick={options[1]?.onClick}
            disabled={options[1]?.disabled || false}
          >
            {options[1].icon}
          </button>
        </div>
      </div>
      <div className='text-center text-[0.625rem] font-bold'>{label}</div>
    </div>
  );
}
