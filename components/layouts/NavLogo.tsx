import Image from 'next/image';
import Link from 'next/link';

export default function NavLogo() {
  return (
    <Link href='/'>
      <Image src='/logo.webp' alt='atctees' width={80} height={48} loading='eager' />
    </Link>
  );
}
