'use client';
import { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { FaSpinner } from 'react-icons/fa';
import Sidebar from '@/components/design/Sidebar';
import SelectProduct from '@/components/design/SelectProduct';
import AddText from '@/components/design/AddText';
import UploadArt from '@/components/design/UploadArt';
import Workspace from '@/components/design/Workspace';
import EditArt from '@/components/design/EditArt';
import ChooseSizes from '@/components/design/ChooseSizes';
import ReviewPrice from '@/components/design/ReviewPrice';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export interface Text {
  value: string;
  positionX: number;
  positionY: number;
  zIndex: number;
  isFlippedHorizontal: boolean;
  isFlippedVertical: boolean;
  isLocked: boolean;
  fontFamily: string;
  color: string;
  outlineColor: string;
  outlineSize: number;
  scale: number;
  rotation: number;
  letterSpacing: number;
  side: 'front' | 'back';
}

export interface Art {
  data: string;
  positionX: number;
  positionY: number;
  zIndex: number;
  isFlippedHorizontal: boolean;
  isFlippedVertical: boolean;
  isLocked: boolean;
  scale: number;
  rotation: number;
  side: 'front' | 'back';
}

export interface History {
  texts: Text[];
  arts: Art[];
}

export interface ProductImage {
  type: 'front' | 'back';
  fileName: string | null;
}

export interface Color {
  title: string;
  slug: string;
  code: string;
}

export interface Product {
  title: string;
  sellPrice: number;
  discount: number;
  thumbnail: string;
  tax: number;
}

export default function Design() {
  const session = useSession();
  const pathname = usePathname();
  const { data: productImages, isLoading: productImagesLoading } = useSWR<ProductImage[]>(
    `/api/getProdcutImages/${pathname?.split('/')[2]}/${pathname?.split('/')[3]}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );
  const { data: color, isLoading: colorLoading } = useSWR<Color>(`/api/getColor/${pathname?.split('/')[3]}`, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  const { data: product, isLoading: productLoading } = useSWR<Product>(
    `/api/getProductInfo/${pathname?.split('/')[2]}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );
  const [activeTab, setActiveTab] = useState(3);
  const [hoveredTab, setHoveredTab] = useState(0);
  const [texts, setTexts] = useState<Text[]>([]);
  const [selectedText, setSelectedText] = useState<number | null>(null);
  const [arts, setArts] = useState<Art[]>([]);
  const [selectedArt, setSelectedArt] = useState<number | null>(null);
  const [side, setSide] = useState<'front' | 'back'>('front');
  const [history, setHistory] = useState<History[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [step, setStep] = useState<'design' | 'choose-size' | 'review-price'>('design');
  const designFrontRef = useRef<HTMLDivElement>(null);
  const designBackRef = useRef<HTMLDivElement>(null);
  const [designFront, setDesignFront] = useState<string>();
  const [designBack, setDesignBack] = useState<string>();
  const [sizeQuantities, setSizeQuantities] = useState<{ [key: string]: number }>({});
  const historyRef = useRef(false);

  const saveDesign = () => {
    setSelectedText(null);
    setSelectedArt(null);
    setTimeout(() => {
      if (designFrontRef.current) {
        html2canvas(designFrontRef.current).then(canvas => setDesignFront(canvas.toDataURL('image/png')));
      }
      if (designBackRef.current) {
        html2canvas(designBackRef.current).then(canvas => setDesignBack(canvas.toDataURL('image/png')));
        setStep('choose-size');
      }
    }, 200);
  };

  useEffect(() => {
    if (historyRef.current) {
      if (history.length >= 20) setHistory(prev => prev.filter((_, i) => i !== 0));
      if (historyIndex < 19) setHistoryIndex(prev => prev + 1);
      setHistory(prev => [...prev, { arts, texts }]);
    } else historyRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arts, texts]);

  if (productImagesLoading || colorLoading || productLoading || session.status === 'loading')
    return (
      <div className='grid place-content-center py-20'>
        <FaSpinner className='animate-spin text-5xl' />
      </div>
    );

  if (session.status === 'unauthenticated')
    return (
      <div className='flex items-center justify-center py-20'>
        <Link href='/login' className='text-primary'>
          Please Login to Continue
        </Link>
      </div>
    );

  return (
    <div className='flex min-h-[calc(100vh-6.3125rem)]'>
      {step === 'design' && (
        <>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} hoveredTab={hoveredTab} />
          <div className='w-96 bg-lotion pr-4 pl-7 pt-5'>
            {activeTab === 1 && <SelectProduct color={color} product={product} />}
            {activeTab === 2 && (
              <AddText
                texts={texts}
                setTexts={setTexts}
                selectedText={selectedText}
                setSelectedText={setSelectedText}
                side={side}
              />
            )}
            {activeTab === 3 &&
              (selectedArt === null ? (
                <UploadArt
                  arts={arts}
                  setArts={setArts}
                  selectedArt={selectedArt}
                  setSelectedArt={setSelectedArt}
                  side={side}
                />
              ) : (
                <EditArt arts={arts} setArts={setArts} selectedArt={selectedArt} setSelectedArt={setSelectedArt} />
              ))}
          </div>
        </>
      )}
      <div className='flex-1 px-4 py-6'>
        {step === 'design' ? (
          <Workspace
            setHoveredTab={setHoveredTab}
            setActiveTab={setActiveTab}
            setTexts={setTexts}
            selectedText={selectedText}
            texts={texts}
            arts={arts}
            setSelectedText={setSelectedText}
            side={side}
            setSide={setSide}
            selectedArt={selectedArt}
            setSelectedArt={setSelectedArt}
            setArts={setArts}
            history={history}
            setHistory={setHistory}
            historyIndex={historyIndex}
            setHistoryIndex={setHistoryIndex}
            historyRef={historyRef}
            designFrontRef={designFrontRef}
            designBackRef={designBackRef}
            productImages={productImages!}
          />
        ) : (
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-2'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={designFront} alt='design' />
            </div>
            {step === 'choose-size' ? (
              <ChooseSizes sizeQuantities={sizeQuantities} setSizeQuantities={setSizeQuantities} />
            ) : (
              <ReviewPrice
                product={product!}
                texts={texts}
                arts={arts}
                sizeQuantities={sizeQuantities}
                productSlug={pathname?.split('/')[2]!}
                colorId={pathname?.split('/')[3]!}
                designFront={designFront!}
                designBack={designBack!}
              />
            )}
          </div>
        )}
        <div className='mt-2 flex justify-end space-x-2'>
          {step !== 'design' && (
            <button
              className='btn px-8 py-3'
              onClick={() => {
                if (step === 'review-price') setStep('choose-size');
                else setStep('design');
              }}
              disabled={texts.length === 0 && arts.length === 0}
            >
              &larr; Previous Step
            </button>
          )}
          {step !== 'review-price' ? (
            <button
              className='btn px-8 py-3'
              onClick={() => {
                if (step === 'design') saveDesign();
                else setStep('review-price');
              }}
              disabled={
                (texts.length === 0 && arts.length === 0) ||
                (step === 'choose-size' && Object.keys(sizeQuantities).length === 0)
              }
            >
              Next Step &rarr;
            </button>
          ) : (
            <button className='btn px-8 py-3' form='addToCartDesign'>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
