'use client';
import { useState } from 'react';
import useSWR from 'swr';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import AddAddress from '../common/AddAddress';
import fetcher from '@/utils/fetcher';

interface Address {
  address: string;
  city: string;
  state: true;
  postalCode: true;
  phone: true;
}

export default function ManageAddress() {
  const [activeTab, setActiveTab] = useState(1);
  const { data, isLoading } = useSWR('/api/getAddresses', fetcher);

  return (
    <Card title='Manage Address'>
      <div className='mb-6 flex min-w-[28rem] space-x-4'>
        <button
          className={`${
            activeTab === 1 ? 'border-primary text-primary' : 'border-transparent'
          } relative border-b-2 font-medium`}
          onClick={() => setActiveTab(1)}
        >
          Existing Addresses
        </button>
        <button
          className={`${
            activeTab === 2 ? 'border-primary text-primary' : 'border-transparent'
          } relative border-b-2 font-medium`}
          onClick={() => setActiveTab(2)}
        >
          Add New Address
        </button>
      </div>
      {activeTab === 1 ? (
        data?.length === 0 ? (
          <p className='text-center'>No Addresses found...</p>
        ) : (
          <Table
            isLoading={isLoading}
            columns={[
              { title: 'Address', dataIndex: 'address' },
              { title: 'State', dataIndex: 'state' },
              { title: 'City', dataIndex: 'city' },
              { title: 'Phone', dataIndex: 'phone' },
              { title: 'Zip / Postal Code', dataIndex: 'postCode' },
            ]}
            data={data?.map((address: Address) => ({
              address: address.address,
              state: address.state,
              city: address.city,
              phone: address.phone,
              postalCode: address.postalCode,
            }))}
          />
        )
      ) : (
        <AddAddress />
      )}
    </Card>
  );
}
