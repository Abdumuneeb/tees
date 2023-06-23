interface Props {
  title: string;
  subTitle: string;
  text?: string;
}

export default function PanelHeader({ title, subTitle, text }: Props) {
  return (
    <>
      <div className='text-[0.65625rem] font-semibold uppercase text-primary'>{title}</div>
      <div className='mb-1 text-xl font-bold text-outer-space-2'>{subTitle}</div>
      {text && <div className='text-xs text-philippine-gray'>{text}</div>}
      <div className='my-3 h-[1px] w-full bg-light-gray'></div>
    </>
  );
}
