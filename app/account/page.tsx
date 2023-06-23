'use client';
import { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import dayjs from 'dayjs';
import { BsEyeFill } from 'react-icons/bs';
import { BsCurrencyDollar } from 'react-icons/bs';
import Table from '@/components/ui/Table';
import Payment from '@/components/checkout/Payment';
import Address from '@/components/checkout/Address';
import fetcher from '@/utils/fetcher';

interface Order {
  OrderStatus: {
    status: string;
  }[];
  id: number;
  code: string;
  createdAt: Date;
  grandTotal: number;
}

export default function Orders() {
  const [orderId, setOrderId] = useState<null | number>(null);
  const [selectedAddress, setSelectedAddress] = useState<number | undefined>();
  const { data, isLoading } = useSWR('/api/getOrders', fetcher);

  return (
    <div className='flex-1'>
      <h1 className='mb-6 text-center text-3xl font-semibold'>Your Orders</h1>
      {orderId ? (
        <>
          <Address selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
          {selectedAddress && (
            <>
              <div className='mt-6'></div>
              <Payment orderId={orderId} addressId={selectedAddress} />
            </>
          )}
          <div className='mt-6 flex justify-end'>
            <button onClick={() => setOrderId(null)} className='link font-semibold'>
              &larr; Back To Orders
            </button>
          </div>
        </>
      ) : data?.length == 0 ? (
        <p className='text-center'>No Orders Yet...</p>
      ) : (
        <Table
          isLoading={isLoading}
          columns={[
            { title: 'Order Code', dataIndex: 'code' },
            { title: 'Order Date', dataIndex: 'date' },
            { title: 'Status', dataIndex: 'status' },
            { title: 'Total Price', dataIndex: 'price' },
            { title: 'Action(s)', dataIndex: 'action' },
          ]}
          data={data?.map((order: Order) => ({
            code: order.code,
            date: dayjs(order.createdAt).format('DD MMM YY'),
            status: order.OrderStatus[0]?.status,
            price: order.grandTotal,
            action: (
              <div className='flex items-center justify-center space-x-3'>
                <Link href={`/account/${order.code}`} title='View Details'>
                  <BsEyeFill className='text-xl text-primary' />
                </Link>
                {order.OrderStatus[0]?.status === 'AWAITING_PAYMENT' && (
                  <button title='Pay Now' onClick={() => setOrderId(order.id)}>
                    <BsCurrencyDollar className='text-xl text-green-600' />
                  </button>
                )}
              </div>
            ),
          }))}
        />
      )}
    </div>
  );
}
