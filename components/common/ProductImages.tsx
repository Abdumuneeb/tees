'use client';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Props {
  images: string[];
}

export default function ProductImages({ images }: Props) {
  return (
    <Carousel
      emulateTouch
      className='w-[420px]'
      renderThumbs={() =>
        images.map(image => (
          <div className='relative h-[70px] w-[70px]' key={image}>
            <Image
              src={process.env.NEXT_PUBLIC_STORAGE_URL + image}
              alt=''
              fill
              className='object-contain'
              sizes='70px'
            />
          </div>
        ))
      }
    >
      {images?.map(image => (
        <div className='relative h-[420px] rounded bg-light-gray' key={image}>
          <Image
            src={process.env.NEXT_PUBLIC_STORAGE_URL + image}
            alt=''
            fill
            className='object-contain'
            sizes='420px'
          />
        </div>
      ))}
    </Carousel>
  );
}
