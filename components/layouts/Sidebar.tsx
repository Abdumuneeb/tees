'use client';
import { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { MdClose } from 'react-icons/md';
import { FiChevronDown } from 'react-icons/fi';
import fetcher from '@/utils/fetcher';
import NavLogo from './NavLogo';

export default function Sidebar() {
  const { data: isMenuOpen, mutate: setIsMenuOpen } = useSWR('isMenuOpen', {
    fallbackData: false,
  });
  const { data: categories } = useSWR('/api/getParentCategories', fetcher, {
    fallbackData: [
      { title: 'T-SHIRTS', slug: 't-shirts', image: '8000_navy_front.png' },
      { title: 'Sweatshirts & Hoodies', slug: 'sweatshirts-and-hoodies', image: '18500_navy_front.png' },
      { title: "Women's", slug: "women's", image: '66292-1670430572.jpg' },
      { title: 'POLO SHIRTS', slug: 'polo-shirts', image: null },
      { title: 'HATS', slug: 'hats', image: '23995-1670344881.png' },
      { title: 'Brands', slug: 'brands', image: null },
      { title: 'JACKETS', slug: 'jackets', image: '35432-1670586933.jpg' },
      { title: 'Pants', slug: 'pants', image: '44433-1676953265.jpg' },
    ],
  });
  const { data: stores } = useSWR('/api/getAllStores', fetcher, {
    fallbackData: [
      { name: 'Northside Fire', slug: 'northside-fire' },
      { name: 'Butler Bulldog Winter', slug: 'butler-bulldog-winter' },
      { name: 'MC Basketball', slug: 'mc-basketball' },
      { name: 'Troop 74', slug: 'troop-74' },
    ],
  });
  const [activeMenu, setActiveMenu] = useState(0);

  return (
    <aside
      className={`${
        isMenuOpen ? 'translate-x-0' : '-translate-x-80'
      } fixed left-0 top-0 z-30 w-80 border-r border-light-gray bg-white shadow-md duration-200 [height:100dvh]`}
    >
      <div className='flex items-center justify-between border-b px-4 py-2'>
        <NavLogo />
        <button>
          <MdClose className='text-2xl' onClick={() => setIsMenuOpen(false)} />
        </button>
      </div>
      <div className='p-4'>
        <div className='flex items-center justify-between border-b py-2'>
          <Link href='/categories/' className='font-medium'>
            Products
          </Link>
          <button className='flex flex-1 justify-end' onClick={() => setActiveMenu(prev => (prev === 1 ? 0 : 1))}>
            <FiChevronDown className={`${activeMenu === 1 ? 'rotate-180' : 'rotate-0'} text-xl duration-150`} />
          </button>
        </div>
        <div className={`${activeMenu === 1 ? 'flex' : 'hidden'} flex-col space-y-1.5 py-1`}>
          {categories.map((category: { title: string; slug: string; image: string | null }) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              {category.title}
            </Link>
          ))}
        </div>
        <div className='flex items-center justify-between border-b py-2'>
          <Link href='/' className='font-medium'>
            Design Lab
          </Link>
          <button className='flex flex-1 justify-end' onClick={() => setActiveMenu(prev => (prev === 2 ? 0 : 2))}>
            <FiChevronDown className={`${activeMenu === 2 ? 'rotate-180' : 'rotate-0'} text-xl duration-150`} />
          </button>
        </div>
        <div className={`${activeMenu === 2 ? 'flex' : 'hidden'} flex-col space-y-1.5 py-1`}>
          <Link href='/'>Screen Printing</Link>
          <Link href='/'>Embroidery</Link>
          <Link href='/'>Direct To Garments</Link>
        </div>
        <div className='flex items-center justify-between border-b py-2'>
          <span className='font-medium'>Team Stores</span>
          <button className='flex flex-1 justify-end' onClick={() => setActiveMenu(prev => (prev === 3 ? 0 : 3))}>
            <FiChevronDown className={`${activeMenu === 3 ? 'rotate-180' : 'rotate-0'} text-xl duration-150`} />
          </button>
        </div>
        <div className={`${activeMenu === 3 ? 'flex' : 'hidden'} flex-col space-y-1.5 py-1`}>
          {stores.map((store: { name: string; slug: string }) => (
            <Link key={store.slug} href={`/stores/${store.slug}`}>
              {store.name}
            </Link>
          ))}
        </div>
        <Link href='/' className='block border-b py-2 font-medium'>
          Design Help
        </Link>
        <Link href='/' className='block border-b py-2 font-medium'>
          Promotional Items
        </Link>
        <Link href='/' className='block border-b py-2 font-medium'>
          About
        </Link>
        <Link href='/design' className='block border-b py-2 font-medium'>
          Design Now
        </Link>
      </div>
    </aside>
  );
}
