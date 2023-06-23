'use client';
import ManageAddress from '@/components/account/ManageAddress';
import ManageProfile from '@/components/account/ManageProfile';

export default function Profile() {
  return (
    <div className='flex-1 space-y-6'>
      <ManageProfile />
      <ManageAddress />
    </div>
  );
}
