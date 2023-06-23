interface Props {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function WorkspaceButton({ icon, label, onClick, disabled }: Props) {
  return (
    <button
      className='mb-2 flex w-[4.375rem] items-center justify-center space-x-0.5 rounded-lg border border-transparent bg-white py-1 text-xl drop-shadow hover:border-primary hover:text-primary disabled:border-transparent disabled:text-current disabled:opacity-20'
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      <span className='text-xs font-medium uppercase'>{label}</span>
    </button>
  );
}
