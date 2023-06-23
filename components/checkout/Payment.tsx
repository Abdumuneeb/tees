import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { toast } from 'react-hot-toast';
import Card from '../ui/Card';
import useFetch from '@/utils/useFetch';

interface Props {
  orderId: number;
  addressId: number;
}

export default function Payment({ orderId, addressId }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(2);
  const { mutate: squarePay } = useFetch();

  return (
    <Card title='Payment Method'>
      <div className='mb-6 flex min-w-[28rem] space-x-4'>
        <button
          className={`${
            activeTab === 2 ? 'border-primary text-primary' : 'border-transparent'
          } relative border-b-2 font-medium`}
          onClick={() => setActiveTab(2)}
        >
          Pay Via Credit Card
        </button>
        <button
          className={`${
            activeTab === 1 ? 'border-primary text-primary' : 'border-transparent'
          } relative border-b-2 font-medium`}
          onClick={() => setActiveTab(1)}
        >
          Pay Via Paypal
        </button>
      </div>
      {activeTab === 1 ? (
        <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
          <PayPalButtons
            style={{ layout: 'horizontal' }}
            createOrder={async () => {
              const res = await fetch('/api/paypalPayment', {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json',
                },
                body: JSON.stringify({ orderId, addressId }),
              });
              return await res.json();
            }}
            // @ts-ignore
            onApprove={(data, actions) => {
              return actions.order
                ?.capture()
                .then(() => {
                  toast.success('Transaction Completed!');
                  router.push('/thank-you');
                })
                .catch(() => {
                  toast.error('Transaction could not be completed! Please try again!');
                });
            }}
          />
        </PayPalScriptProvider>
      ) : (
        <PaymentForm
          applicationId={process.env.NEXT_PUBLIC_SQUARE_CLIENT_ID!}
          cardTokenizeResponseReceived={async token => {
            squarePay({
              url: '/api/squarePayment',
              method: 'POST',
              body: { orderId, sourceId: token.token, addressId },
              messages: {
                loading: 'Processing Transaction...',
                success: 'Transaction Completed!',
              },
              onSuccess: () => router.push('/thank-you'),
            });
          }}
          locationId='LID'
        >
          <CreditCard />
        </PaymentForm>
      )}
    </Card>
  );
}
