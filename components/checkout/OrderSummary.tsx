'use client';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import Table from '@/components/ui/Table';
import fetcher from '@/utils/fetcher';
interface CartItem {
  id: number;
  color: {
    title: string;
  } | null;
  size: {
    title: string;
  } | null;
  productStock: {
    ProductStockImage: {
      fileName: string;
    }[];
  } | null;
  price: number | null;
  quantity: number | null;
  discount: number | null;
  isDesign: boolean;
  title: string | null;
  product: {
    slug: string;
    title: string;
    sku: string;
    thumbnail: string | null;
  };
  CartDesignSize: {
    size: {
      title: string;
    };
    quantity: number;
  }[];
  CartDesignFile: {
    designFile: string;
  }[];
}

export default function OrderSummary() {
  const { data, isLoading: cartLoading } = useSWR('/api/getCart', fetcher, {
    refreshInterval: 999999,
  });
  const { data: cartCount } = useSWR('/api/getCartCount');

  return cartCount === 0 ? (
    <p className='rounded border py-10 text-center'>No Items Yet...</p>
  ) : (
    <Table
      isLoading={cartLoading}
      loadingItems={cartCount || 3}
      columns={[
        { title: 'Image', dataIndex: 'image' },
        { title: 'Product', dataIndex: 'product' },
        { title: 'Sku', dataIndex: 'sku' },
        { title: 'Price', dataIndex: 'price' },
        { title: 'Color', dataIndex: 'color' },
        { title: 'Quantity & Size', dataIndex: 'quantity_size' },
        { title: 'Total', dataIndex: 'total' },
      ]}
      data={data?.map((cartItem: CartItem) => ({
        image: (
          <div className='relative mx-auto h-20 w-20'>
            <Image
              src={
                cartItem.isDesign
                  ? cartItem.CartDesignFile[0]?.designFile
                  : cartItem?.product?.thumbnail
                  ? process.env.NEXT_PUBLIC_STORAGE_URL + cartItem?.product?.thumbnail
                  : cartItem?.productStock?.ProductStockImage[0]?.fileName
                  ? process.env.NEXT_PUBLIC_STORAGE_URL + cartItem.productStock.ProductStockImage[0]?.fileName
                  : ''
              }
              alt=''
              fill
              className='object-fit'
            />
          </div>
        ),
        product: (
          <Link href={`/products/${cartItem?.product?.slug}`} className='link'>
            {cartItem?.title || cartItem?.title}
          </Link>
        ),
        sku: cartItem?.product?.sku,
        price: cartItem.isDesign ? cartItem.price : (cartItem?.price || 0) - (cartItem?.discount || 0),
        color: cartItem?.color?.title,
        quantity_size: cartItem.isDesign
          ? cartItem.CartDesignSize.map(s => `${s.quantity} * ${s.size.title}`).join(', ')
          : `${cartItem?.quantity} * ${cartItem?.size?.title}`,
        total: ((cartItem?.price || 0) - (cartItem?.discount || 0)) * (cartItem?.quantity || 0),
      }))}
      summary={
        <div className='flex justify-between px-3'>
          <div className='font-medium'>Grand Total</div>
          <div>
            {data?.reduce(
              (accumulator: any, currentValue: any) =>
                accumulator + (currentValue?.price - currentValue?.discount) * currentValue.quantity,
              0
            )}
          </div>
        </div>
      }
    />
  );
}
