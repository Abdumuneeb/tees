import { RiTruckLine } from 'react-icons/ri';
import { BiRocket } from 'react-icons/bi';
import { FiThumbsUp } from 'react-icons/fi';
import dayjs from 'dayjs';

export default function Features() {
  return (
    <div className='container mb-10'>
      <div className='grid grid-cols-1 gap-x-4 gap-y-2 rounded-lg border border-black/[0.15] py-6 md:grid-cols-3 md:space-y-0'>
        <div className='flex items-center space-x-2 border-b border-black/[0.15] px-6 pb-2 md:border-r md:border-b-0 md:pb-0'>
          <RiTruckLine className='text-4xl' />
          <div>
            <h3 className='text-lg font-semibold'>Free Delivery</h3>
            <p>Guaranteed in 2 weeks! {dayjs(new Date()).add(2, 'week').format('ddd MMM DD')}</p>
          </div>
        </div>
        <div className='flex items-center space-x-2 border-b border-black/[0.15] px-6 pb-2 md:border-r md:border-b-0 md:pb-0'>
          <BiRocket className='text-4xl ' />
          <div>
            <h3 className='text-lg font-semibold'>Rush Orders</h3>
            <p>Guaranteed in 1 weeks! {dayjs(new Date()).add(1, 'week').format('ddd MMM DD')}</p>
          </div>
        </div>
        <div className='flex items-center space-x-2 px-6'>
          <FiThumbsUp className='text-4xl' />
          <div>
            <h3 className='text-lg font-semibold'>Guranteed By</h3>
            <p>UPS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
