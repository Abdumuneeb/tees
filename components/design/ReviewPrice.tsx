'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import type { Art, Product, Text } from '@/app/design/[productSlug]/[colorId]/page';
import calculatePrice from '@/utils/calculatePrice';
import PanelHeader from './PanelHeader';
import { FaSpinner } from 'react-icons/fa';
import useFetch from '@/utils/useFetch';

interface Props {
  product: Product;
  texts: Text[];
  arts: Art[];
  sizeQuantities: { [key: string]: number };
  productSlug: string;
  colorId: string;
  designFront: string;
  designBack: string;
}

export default function ReviewPrice({
  product,
  texts,
  arts,
  sizeQuantities,
  productSlug,
  colorId,
  designBack,
  designFront,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [artsColorsQuantity, setArtsColorsQuantity] = useState<number>(0);
  const { mutate: addToCart, isLoading: isLoadingCart } = useFetch();
  const [designName, setDesignName] = useState('');

  useEffect(() => {
    const getNoOfColors = async () => {
      const res = await fetch('/api/getNoOfColors', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ images: arts.map(art => art.data) }),
      });
      const data = await res.json();
      setArtsColorsQuantity(data.noOfColors);
      setIsLoading(false);
    };
    getNoOfColors();
  }, [arts]);

  const quantity = useMemo(
    () => Object.values(sizeQuantities).reduce((acc, value) => acc + value, 0),
    [sizeQuantities]
  );

  const getTextsColorsQuantity = useCallback(() => {
    const distinctColors = new Set<string>();
    texts.forEach(text => distinctColors.add(text.color));
    return distinctColors.size;
  }, [texts]);

  const addToCartDesign = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoadingCart || isLoading) return;
    addToCart({
      url: '/api/addToCartDesign',
      method: 'POST',
      body: {
        noOfColors: getTextsColorsQuantity() + artsColorsQuantity,
        productSlug,
        colorId: parseInt(colorId),
        designFiles: [designFront, designBack],
        sizeQuantities: sizeQuantities,
        title: designName,
      },
      messages: {
        success: 'Added to cart',
        loading: 'Adding to cart...',
        error: 'Something went wrong',
      },
    });
  };

  return (
    <div className='rounded-lg bg-anti-flash-white p-8'>
      <PanelHeader
        title='Review Your Order'
        subTitle='Your Products & Pricing'
        text='Your order includes a professional design review and satisfaction guarantee'
      />
      {isLoading ? (
        <div className='grid place-content-center py-20'>
          <FaSpinner className='animate-spin text-5xl' />
        </div>
      ) : (
        <div className='mb-4 grid grid-cols-2 gap-y-2'>
          <div className='font-semibold'>Total Quantity:</div>
          <div>{quantity}</div>
          <div className='font-semibold'>Total Colors:</div>
          <div>{getTextsColorsQuantity() + artsColorsQuantity}</div>
          <div className='font-semibold'>Design Price:</div>
          <div>
            ${calculatePrice(quantity, getTextsColorsQuantity() + artsColorsQuantity)} x {quantity} = $
            {calculatePrice(quantity, getTextsColorsQuantity() + artsColorsQuantity) * quantity}
          </div>
          <div className='font-semibold'>Total Price:</div>
          <div>
            (${product?.sellPrice - product?.discount + product?.tax} + $
            {calculatePrice(quantity, getTextsColorsQuantity() + artsColorsQuantity)}) x {quantity} = $
            {(product?.sellPrice -
              product?.discount +
              product?.tax +
              calculatePrice(quantity, getTextsColorsQuantity() + artsColorsQuantity)) *
              quantity}
          </div>
        </div>
      )}
      <Image src='/pricing.jpeg' alt='atctees-pricing' width={957} height={429} priority />
      <form className='mt-6' id='addToCartDesign' onSubmit={addToCartDesign}>
        <label htmlFor='designName' className='font-semibold'>
          Design Name*
        </label>
        <input
          id='desingName'
          type='text'
          placeholder='Design Name'
          required
          className='w-full'
          value={designName}
          onChange={e => setDesignName(e.target.value)}
        />
      </form>
    </div>
  );
}
