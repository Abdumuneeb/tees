interface Props {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function WorkspaceAction({ icon, label, onClick, onMouseEnter, onMouseLeave }: Props) {
  return (
    <button
      className='mb-2 flex items-center justify-start space-x-1 rounded-full border border-transparent bg-white py-1.5 px-4 drop-shadow hover:border-primary hover:text-primary'
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon}
      <span className='text-xs font-medium uppercase'>{label}</span>
    </button>
  );
}
