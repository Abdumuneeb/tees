import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  slug: string;
  image: string | null;
}

export default function CategoryCard({ title, slug, image }: Props) {
  return (
    <Link href={slug} className='rounded border border-platinum bg-white pb-1 hover:shadow-md'>
      <div className='mb-4 mt-4 truncate text-center text-lg font-bold lowercase first-letter:uppercase'>{title}</div>
      <div className='relative h-56 w-full sm:h-80'>
        <Image
          src={image ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${image}` : ''}
          alt={title}
          className='object-contain'
          sizes='(min-width: 1280px) 25vw,
              (min-width: 1024px) 33vw,
              50vw'
          fill
        />
      </div>
    </Link>
  );
}
