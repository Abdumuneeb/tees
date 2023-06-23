'use client';
import { type Dispatch, type SetStateAction, useState } from 'react';
import useSWR from 'swr';
import Card from '../ui/Card';
import fetcher from '@/utils/fetcher';
import AddAddress from '../common/AddAddress';

interface Address {
  address: string;
  city: string;
  id: number;
}

interface Props {
  selectedAddress: number | undefined;
  setSelectedAddress: Dispatch<SetStateAction<number | undefined>>;
}

export default function Address({ selectedAddress, setSelectedAddress }: Props) {
  const [activeTab, setActiveTab] = useState(1);
  const { data: addresses } = useSWR('/api/getAddresses', fetcher);

  return (
    <Card title='Confirm Your Address'>
      <div className='mb-6 flex min-w-[28rem] space-x-4'>
        <button
          className={`${
            activeTab === 1 ? 'border-primary text-primary' : 'border-transparent'
          } relative border-b-2 py-2 font-medium`}
          onClick={() => setActiveTab(1)}
        >
          Existing Address
        </button>
        <button
          className={`${
            activeTab === 2 ? 'border-primary text-primary' : 'border-transparent'
          } relative border-b-2 py-2 font-medium`}
          onClick={() => setActiveTab(2)}
        >
          Add New Address
        </button>
      </div>
      {activeTab === 1 ? (
        <select
          defaultValue=''
          onChange={e => setSelectedAddress(parseInt(e.target.value))}
          value={selectedAddress}
          className='w-full'
        >
          <option value='' disabled>
            Select Address
          </option>
          {addresses?.map((address: Address) => (
            <option key={address.id} value={address.id}>
              {address.address} - {address.city}
            </option>
          ))}
        </select>
      ) : (
        <AddAddress />
      )}
    </Card>
  );
}
