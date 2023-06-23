'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import Table from '@/components/ui/Table';
import fetcher from '@/utils/fetcher';

export default function OrderDetails() {
  const pathname = usePathname();
  const { data, isLoading } = useSWR(`/api/getOrderDetails/${pathname?.split('/')[2]}`, fetcher);

  return (
    <div className='flex-1'>
      <h1 className='mb-6 text-center text-3xl font-semibold'>Order # {pathname?.split('/')[2]}</h1>
      <Table
        className='mb-6'
        isLoading={isLoading}
        columns={[
          { title: 'Image', dataIndex: 'image' },
          { title: 'Product', dataIndex: 'product' },
          { title: 'Sku', dataIndex: 'sku' },
          { title: 'Price', dataIndex: 'price' },
          { title: 'Quantity', dataIndex: 'quantity' },
          { title: 'Color', dataIndex: 'color' },
          { title: 'Size', dataIndex: 'size' },
          { title: 'Total', dataIndex: 'total' },
          { title: 'Action(s)', dataIndex: 'action' },
        ]}
        data={data?.OrderProduct?.map((orderProduct: any) => ({
          image: (
            <div className='relative mx-auto h-20 w-20'>
              <Image
                src={
                  orderProduct?.productStock?.product?.thumbnail
                    ? process.env.NEXT_PUBLIC_STORAGE_URL + orderProduct?.productStock?.product?.thumbnail
                    : orderProduct?.productStock?.ProductStockImage[0]?.fileName
                    ? process.env.NEXT_PUBLIC_STORAGE_URL + orderProduct.productStock.ProductStockImage[0]?.fileName
                    : ''
                }
                alt=''
                fill
                className='object-fit'
              />
            </div>
          ),
          product: (
            <Link href={`/products/${orderProduct?.productStock?.product.slug}`} className='link'>
              {orderProduct?.productStock?.product.title}
            </Link>
          ),
          sku: orderProduct?.productStock?.product.sku,
          price: (orderProduct?.price || 0) - (orderProduct?.discount || 0),
          quantity: orderProduct?.quantity,
          color: orderProduct?.color?.title,
          size: orderProduct?.size?.title,
          total: ((orderProduct?.price || 0) - (orderProduct?.discount || 0)) * (orderProduct?.quantity || 0),
          action: data?.OrderStatus?.some((el: any) => el?.status === 'PAID') && (
            <Link
              href={`${pathname}/${orderProduct?.id}/${orderProduct?.productStock?.product?.slug}`}
              className='btn-2 px-1.5 py-0.5 text-sm'
            >
              Review
            </Link>
          ),
        }))}
        summary={
          <div className='flex justify-between px-3'>
            <div className='font-medium'>Grand Total</div>
            <div>
              {data?.OrderProduct?.reduce(
                (accumulator: any, currentValue: any) =>
                  accumulator + (currentValue?.price - currentValue?.discount) * currentValue?.quantity,
                0
              )}
            </div>
          </div>
        }
      />
      <div className='flex justify-end'>
        <Link href='/account' className='link font-semibold'>
          &larr; Back To Orders
        </Link>
      </div>
    </div>
  );
}
