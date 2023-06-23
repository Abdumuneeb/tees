import Image from 'next/image';
import PanelHeader from './PanelHeader';
import { Color, Product } from '@/app/design/[productSlug]/[colorId]/page';

interface Props {
  color: Color | undefined;
  product: Product | undefined;
}

export default function SelectProduct({ color, product }: Props) {
  return (
    <>
      <PanelHeader title='Product' subTitle='Manage Your Product' text='You can select product and color to design.' />
      <div className='border-platimum rounded-lg border bg-cultured-2 p-2 drop-shadow'>
        <div className='text-sm font-bold text-outer-space-2'>{product?.title}</div>
        <button className='mb-2 text-[0.6875rem] text-primary'>Change Product</button>
        <div className='flex items-center justify-between'>
          <div className='w-fit'>
            <div className='rounded-lg border border-primary p-2'>
              <Image
                src={product?.thumbnail ? process.env.NEXT_PUBLIC_STORAGE_URL! + product.thumbnail : '/pro1.jpg'}
                alt=''
                width={50}
                height={50}
              />
            </div>
            <div className='text-center text-[0.6875rem] font-medium'>{color?.title}</div>
          </div>
          <button
            className='flex items-center space-x-1 rounded-lg px-2.5 py-[0.3125rem] text-[0.625rem] font-medium text-primary drop-shadow-md'
            style={{
              color: color?.code || '#ffffff',
            }}
          >
            <div className='h-2.5 w-2.5 rounded-full border border-[#e3e7eb] bg-yellow-500'></div>
            <span>Change</span>
          </button>
        </div>
      </div>
    </>
  );
}
