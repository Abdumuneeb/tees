'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { FaTrash } from 'react-icons/fa';
import Table from '@/components/ui/Table';
import fetcher from '@/utils/fetcher';
import useFetch from '@/utils/useFetch';

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

export default function Cart() {
  const router = useRouter();
  const { data, mutate: mutateCartCount, isLoading: cartLoading } = useSWR('/api/getCart', fetcher);
  const { data: cartCount, mutate: mutateCart } = useSWR('/api/getCartCount');
  const { mutate: deleteCartItemFunc, isLoading } = useFetch();

  const deleteCartItem = (id: number) => {
    deleteCartItemFunc({
      url: '/api/removeCartItem',
      method: 'DELETE',
      body: {
        id,
      },
      messages: {
        loading: 'Deleting from Cart...',
        success: 'Deleted from to Cart!',
      },
      onSuccess: () => {
        mutateCartCount();
        mutateCart();
      },
    });
  };

  return (
    <div className='container my-10'>
      <h1 className='mb-6 text-center text-3xl font-semibold'>Your Cart</h1>
      {cartCount === 0 ? (
        <p className='mb-6 rounded border py-10 text-center'>No Items Yet...</p>
      ) : (
        <Table
          className='mb-6'
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
            { title: 'Action(s)', dataIndex: 'action' },
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
            action: (
              <button onClick={() => deleteCartItem(cartItem.id)} disabled={isLoading}>
                <FaTrash className='text-red-600 hover:text-red-500' />
              </button>
            ),
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
      )}
      <div className='flex justify-between'>
        <button onClick={() => router.back()} className='link font-semibold'>
          &larr; Continue Shopping
        </button>
        <Link href='/checkout' className='link font-semibold'>
          Proceed To Checkout &rarr;
        </Link>
      </div>
    </div>
  );
}
