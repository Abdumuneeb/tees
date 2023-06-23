'use client';
import useSWR from 'swr';
import { FiMenu } from 'react-icons/fi';
import fetcher from '@/utils/fetcher';
import NavLogo from './NavLogo';
import NavMenu from './NavMenu';

export default function Navbar() {
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

  return (
    <nav className='flex items-center justify-between bg-white py-2 px-6 shadow-lg lg:px-8'>
      <NavLogo />
      <NavMenu stores={stores} categories={categories} />
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='lg:hidden'>
        <FiMenu className='text-2xl' />
      </button>
    </nav>
  );
}
