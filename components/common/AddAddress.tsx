'use client';
import { type FormEvent, useState } from 'react';
import useSWR from 'swr';
import useFetch from '@/utils/useFetch';
import LoadingButton from '../ui/LoadingButton';

export default function AddAddress() {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const { mutate: mutateAddress } = useSWR('/api/getAddresses');
  const { mutate, isLoading } = useFetch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      url: '/api/addAddress',
      method: 'POST',
      body: {
        state,
        city,
        address,
        postalCode,
        phone,
      },
      messages: {
        loading: 'Adding Address...',
        success: 'Address Added!',
      },
      onSuccess: () => {
        mutateAddress();
      },
    });
  };

  return (
    <form className='flex flex-col space-y-2' onSubmit={handleSubmit}>
      <input type='tel' placeholder='Enter Phone #' value={phone} onChange={e => setPhone(e.target.value)} required />
      <input
        type='text'
        placeholder='Enter Address'
        value={address}
        onChange={e => setAddress(e.target.value)}
        required
      />
      <input type='text' placeholder='Enter State' value={state} onChange={e => setState(e.target.value)} required />
      <input type='text' placeholder='Enter City' value={city} onChange={e => setCity(e.target.value)} required />
      <input
        type='text'
        placeholder='Enter Zip / Postal Code'
        value={postalCode}
        onChange={e => setPostalCode(e.target.value)}
      />
      <LoadingButton isLoading={isLoading} className='btn-2 py-1.5'>
        Add Address
      </LoadingButton>
    </form>
  );
}
