import Link from 'next/link';
import NavDropdown from './NavDropdown';

interface Props {
  stores: {
    slug: string;
    name: string;
  }[];
  categories: {
    title: string;
    slug: string;
  }[];
}

export default function NavMenu({ stores, categories }: Props) {
  return (
    <ul className='hidden items-center space-x-2 font-medium lg:flex'>
      <li className='group relative'>
        <Link href='/categories/' className='px-2 py-4 font-medium group-hover:text-primary'>
          Products
        </Link>
        <NavDropdown
          items={categories?.map(category => ({ url: `/categories/${category.slug}`, label: category.title }))}
        />
      </li>
      <li className='group relative'>
        <Link href='/' className='px-2 py-4 font-medium group-hover:text-primary'>
          Design Help
        </Link>
        <NavDropdown
          items={[
            { url: '/', label: 'Screen Printing' },
            { url: '/', label: 'Embroidery' },
            { url: '/', label: 'Direct To Garments' },
          ]}
        />
      </li>
      <li className='group relative'>
        <span className='cursor-pointer px-2 py-4 font-medium group-hover:text-primary'>Team Stores</span>
        <NavDropdown items={stores?.map(store => ({ url: `/stores/${store.slug}`, label: store.name }))} />
      </li>
      <li>
        <Link href='/' className='px-2 py-4 font-medium hover:text-primary'>
          Design Lab
        </Link>
      </li>
      <li>
        <Link href='/' className='px-2 py-4 font-medium hover:text-primary'>
          Promotional Items
        </Link>
      </li>
      <li>
        <Link href='/' className='px-2 py-4 font-medium hover:text-primary'>
          About
        </Link>
      </li>
      <li>
        <Link href='/design' className='btn-alt capitalize'>
          Design Now
        </Link>
      </li>
    </ul>
  );
}
