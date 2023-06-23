interface Props {
  name: string;
}

export default function Avatar({ name }: Props) {
  return (
    <div className='grid h-11 w-11 place-content-center rounded-full bg-light-gray font-semibold'>
      {name
        ?.split(' ')
        ?.map(el => el[0])
        ?.join('')}
    </div>
  );
}
