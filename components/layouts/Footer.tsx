import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='mt-auto border-t bg-anti-flash-white py-10 px-8'>
      <div className='mb-2 flex flex-col gap-2 lg:flex-row'>
        <div className='flex-1'>
          <div className='mb-1 text-lg font-semibold'>ATC Tees - Around The Clock</div>
          <p>
            With over 20 years experience in the screen printing industry, we’re the custom printing experts for screen
            printing and embroidery in New Jersey that delivers exceptional printed and promotional products all across
            the country.
          </p>
        </div>
        <div className='grid flex-1 grid-cols-2 justify-between sm:flex'>
          <div className='flex flex-col'>
            <div className='mb-1 text-lg font-semibold'>Company</div>
            <Link href='/' className='hover:text-primary'>
              Custom T-Shirts
            </Link>
            <Link href='/' className='hover:text-primary'>
              Sweatshirts & Hoodies
            </Link>
            <Link href='/' className='hover:text-primary'>
              Caps
            </Link>
            <Link href='/' className='hover:text-primary'>
              Outwears
            </Link>
            <Link href='/' className='hover:text-primary'>
              Women
            </Link>
            <Link href='/' className='hover:text-primary'>
              Kids
            </Link>
            <Link href='/' className='hover:text-primary'>
              New Arrival
            </Link>
            <Link href='/' className='hover:text-primary'>
              All Products
            </Link>
          </div>
          <div className='flex flex-col'>
            <div className='mb-1 text-lg font-semibold'>Services</div>
            <Link href='/' className='hover:text-primary'>
              Screen Printing
            </Link>
            <Link href='/' className='hover:text-primary'>
              Embroider
            </Link>
            <Link href='/' className='hover:text-primary'>
              Direct To Garment
            </Link>
          </div>
          <div className='flex flex-col'>
            <div className='mb-1 text-lg font-semibold'>About</div>
            <Link href='/' className='hover:text-primary'>
              Reviews
            </Link>
            <Link href='/' className='hover:text-primary'>
              Our Story
            </Link>
            <Link href='/' className='hover:text-primary'>
              Blogs
            </Link>
            <Link href='/' className='hover:text-primary'>
              View All
            </Link>
          </div>
          <div className='flex flex-col'>
            <div className='mb-1 text-lg font-semibold'>Lets Talk</div>
            <span>Live Chat</span>
            <span>2019600087</span>
            <a href='mailto:info@atcprinting.com' className='hover:text-primary'>
              info@atcprinting.com
            </a>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-between gap-2 sm:flex-row'>
        <div className='flex space-x-5'>
          <a href='www.facebook.com' target='_blank'>
            <FaFacebook className='text-xl hover:text-primary' />
          </a>
          <a href='www.instagram.com' target='_blank'>
            <FaInstagram className='text-xl hover:text-primary' />
          </a>
          <a href='www.twitter.com' target='_blank'>
            <FaTwitter className='text-xl hover:text-primary' />
          </a>
          <a href='www.youtube.com' target='_blank'>
            <FaYoutube className='text-xl hover:text-primary' />
          </a>
        </div>
        <div className='space-x-2'>
          <span>© Copyright {new Date().getFullYear()} atctees.com</span>
          <span>|</span>
          <span>All right reserved.</span>
        </div>
      </div>
    </footer>
  );
}
