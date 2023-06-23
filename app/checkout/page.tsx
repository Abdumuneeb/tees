'use client';
import { useState } from 'react';
import useSWR from 'swr';
import Address from '@/components/checkout/Address';
import OrderSummary from '@/components/checkout/OrderSummary';
import LoadingButton from '@/components/ui/LoadingButton';
import Payment from '@/components/checkout/Payment';
import Profile from '@/components/checkout/Profile';
import useFetch from '@/utils/useFetch';
import fetcher from '@/utils/fetcher';

export default function Checkout() {
  const { data: userData, isLoading: userDataLoading } = useSWR('/api/getUser', fetcher);
  const [selectedAddress, setSelectedAddress] = useState<number | undefined>();
  const { mutate, isLoading, data } = useFetch();

  const createOrder = () => {
    mutate({
      url: '/api/createOrder',
      method: 'POST',
      body: {
        addressId: selectedAddress,
      },
      messages: {
        loading: 'Confirming Order...',
        success: 'Order Confirmed!',
      },
    });
  };

  return (
    <div className='container my-10'>
      <h1 className='mb-6 text-center text-3xl font-semibold'>Checkout</h1>
      {data?.orderId && selectedAddress ? (
        <Payment orderId={data?.orderId} addressId={selectedAddress} />
      ) : (
        <div className='mb-10 flex flex-col gap-4 first:flex-[3] last:flex-[2] lg:flex-row'>
          <div className='flex-1'>
            <OrderSummary />
            <LoadingButton
              isLoading={isLoading}
              className='btn-2 mt-2 w-full py-1.5'
              disabled={selectedAddress === undefined || userData?.name === undefined}
              onClick={createOrder}
            >
              Confirm Order
            </LoadingButton>
          </div>
          <div className='space-y-2'>
            <Profile data={userData} isLoading={userDataLoading} />
            <Address selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
          </div>
        </div>
      )}
    </div>
  );
}
