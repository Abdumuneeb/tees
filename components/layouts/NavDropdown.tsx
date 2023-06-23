import Link from 'next/link';

interface Props {
  items: {
    url: string;
    label: string;
  }[];
}

export default function NavDropdown({ items }: Props) {
  return (
    <ul className='border-light absolute top-8 left-1/2 z-20 hidden w-max min-w-[10rem] -translate-x-1/2 rounded border bg-white py-1 text-sm font-normal before:absolute before:left-1/2 before:-top-2 before:block before:h-2 before:w-full before:-translate-x-1/2 sm:group-hover:block'>
      {items.map((item, index) => (
        <li key={index}>
          <Link href={item.url} className='block py-1 px-4 hover:bg-cultured'>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
