import AccountMenu from './AccountMenu';
import CartMenu from './CartMenu';

export default function TopNav() {
  return (
    <div className='flex items-center justify-end border-b border-black/5 bg-anti-flash-white px-4 py-2 text-sm sm:justify-between lg:px-6'>
      <div className='hidden sm:block'>500,000+ Customers Nationwide w/ 99.7% Satisfaction</div>
      <div className='flex items-center space-x-4'>
        <AccountMenu />
        <CartMenu />
      </div>
    </div>
  );
}
