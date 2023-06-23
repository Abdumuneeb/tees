'use client';
import { type Dispatch, type SetStateAction, useState, useMemo } from 'react';
import Image from 'next/image';
import { BiUndo, BiRedo } from 'react-icons/bi';
import { RxZoomIn, RxZoomOut } from 'react-icons/rx';
import { BiText, BiUpload } from 'react-icons/bi';
import WorkspaceButton from '@/components/design/WorkspaceButton';
import WorkspaceAction from './WorkspaceAction';
import type { Art, Text, History } from '@/app/design/[productSlug]/[colorId]/page';
import WorkspaceText from './WorkspaceText';
import WorkspaceArt from './WorkspaceArt';
import { ProductImage } from '@/app/design/[productSlug]/[colorId]/page';

interface Props {
  setHoveredTab: Dispatch<SetStateAction<number>>;
  setActiveTab: Dispatch<SetStateAction<number>>;
  texts: Text[];
  arts: Art[];
  setSelectedText: Dispatch<SetStateAction<number | null>>;
  side: 'front' | 'back';
  setSide: Dispatch<SetStateAction<'front' | 'back'>>;
  setTexts: Dispatch<SetStateAction<Text[]>>;
  selectedText: number | null;
  selectedArt: number | null;
  setSelectedArt: Dispatch<SetStateAction<number | null>>;
  setArts: Dispatch<SetStateAction<Art[]>>;
  history: History[];
  setHistory: Dispatch<SetStateAction<History[]>>;
  historyIndex: number;
  setHistoryIndex: Dispatch<SetStateAction<number>>;
  historyRef: React.MutableRefObject<boolean>;
  designFrontRef: React.RefObject<HTMLDivElement>;
  designBackRef: React.RefObject<HTMLDivElement>;
  productImages: ProductImage[];
}

export default function Workspace({
  setHoveredTab,
  setActiveTab,
  texts,
  arts,
  setSelectedText,
  side,
  setSide,
  setTexts,
  selectedText,
  selectedArt,
  setSelectedArt,
  setArts,
  historyIndex,
  setHistoryIndex,
  history,
  setHistory,
  historyRef,
  designFrontRef,
  designBackRef,
  productImages,
}: Props) {
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const frontTexts = useMemo(() => texts.filter(text => text.side === 'front'), [texts]);
  const backTexts = useMemo(() => texts.filter(text => text.side === 'back'), [texts]);
  const frontArts = useMemo(() => arts.filter(art => art.side === 'front'), [arts]);
  const backArts = useMemo(() => arts.filter(art => art.side === 'back'), [arts]);
  const frontImage = useMemo(
    () =>
      productImages?.find(image => image.type === 'front')?.fileName
        ? process.env.NEXT_PUBLIC_STORAGE_URL! + productImages.find(image => image.type === 'front')?.fileName
        : '/front.png',
    [productImages]
  );
  const backImage = useMemo(
    () =>
      productImages?.find(image => image.type === 'back')?.fileName
        ? process.env.NEXT_PUBLIC_STORAGE_URL! + productImages.find(image => image.type === 'back')?.fileName
        : '/back.png',
    [productImages]
  );

  return (
    <div
      className='flex items-start'
      onClick={() => {
        setSelectedText(null);
        setSelectedArt(null);
      }}
    >
      <div onClick={e => e.stopPropagation()}>
        <WorkspaceButton
          onClick={() => {
            historyRef.current = false;
            setTexts(history[historyIndex - 1].texts);
            setArts(history[historyIndex - 1].arts);
            setHistoryIndex(prev => prev - 1);
          }}
          icon={<BiUndo />}
          label='undo'
          disabled={history.length === 20 ? historyIndex === 0 : historyIndex === -1}
        />
        <WorkspaceButton
          onClick={() => {
            historyRef.current = false;
            setTexts(history[historyIndex + 1].texts);
            setArts(history[historyIndex + 1].arts);
            setHistoryIndex(prev => prev + 1);
          }}
          icon={<BiRedo />}
          label='Redo'
          disabled={historyIndex + 2 > history.length}
        />
      </div>
      <div
        className={`${isZoomedIn ? 'scale-150' : 'scale-100'}  ${side === 'back' ? 'hidden' : ''}  relative flex-1`}
        ref={designFrontRef}
      >
        <Image src={frontImage} alt='' width={642} height={636} className='mx-auto' />
        {frontTexts.length === 0 && arts.length === 0 ? (
          <div className='absolute left-1/2 top-1/4 grid -translate-x-1/2 gap-1' onClick={e => e.stopPropagation()}>
            <WorkspaceAction
              label='Add text'
              icon={<BiText />}
              onMouseEnter={() => setHoveredTab(2)}
              onMouseLeave={() => setHoveredTab(0)}
              onClick={() => setActiveTab(2)}
            />
            <WorkspaceAction
              label='Upload art'
              icon={<BiUpload />}
              onMouseEnter={() => setHoveredTab(3)}
              onMouseLeave={() => setHoveredTab(0)}
              onClick={() => setActiveTab(3)}
            />
          </div>
        ) : (
          <>
            <div className='absolute left-1/2 top-1/4 grid -translate-x-1/2 gap-1' onClick={e => e.stopPropagation()}>
              {frontTexts?.map((text, i) => (
                <WorkspaceText
                  setSelectedText={setSelectedText}
                  text={text}
                  i={i}
                  key={i}
                  selectedText={selectedText}
                  setTexts={setTexts}
                />
              ))}
            </div>
            <div className='absolute left-1/2 top-1/4 grid -translate-x-1/2 gap-1' onClick={e => e.stopPropagation()}>
              {frontArts?.map((art, i) => (
                <WorkspaceArt
                  setSelectedArt={setSelectedArt}
                  art={art}
                  i={i}
                  key={i}
                  selectedArt={selectedArt}
                  setArts={setArts}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div
        className={`${isZoomedIn ? 'scale-150' : 'scale-100'} ${side === 'front' ? 'hidden' : ''} relative flex-1`}
        ref={designBackRef}
      >
        <Image src={backImage} alt='' width={642} height={636} className='mx-auto' />
        {backTexts.length === 0 && arts.length === 0 ? (
          <div className='absolute left-1/2 top-1/4 grid -translate-x-1/2 gap-1' onClick={e => e.stopPropagation()}>
            <WorkspaceAction
              label='Add text'
              icon={<BiText />}
              onMouseEnter={() => setHoveredTab(2)}
              onMouseLeave={() => setHoveredTab(0)}
              onClick={() => setActiveTab(2)}
            />
            <WorkspaceAction
              label='Upload art'
              icon={<BiUpload />}
              onMouseEnter={() => setHoveredTab(3)}
              onMouseLeave={() => setHoveredTab(0)}
              onClick={() => setActiveTab(3)}
            />
          </div>
        ) : (
          <>
            <div className='absolute left-1/2 top-1/4 grid -translate-x-1/2 gap-1' onClick={e => e.stopPropagation()}>
              {backTexts?.map((text, i) => (
                <div key={i} onClick={() => setSelectedText(i)}>
                  {text.value}
                </div>
              ))}
            </div>
            <div className='absolute left-1/2 top-1/4 grid -translate-x-1/2 gap-1' onClick={e => e.stopPropagation()}>
              {backArts?.map((art, i) => (
                <WorkspaceArt
                  setSelectedArt={setSelectedArt}
                  art={art}
                  i={i}
                  key={i}
                  selectedArt={selectedArt}
                  setArts={setArts}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div>
        <div className='mb-3 rounded-lg bg-white p-1.5 drop-shadow'>
          <div onClick={() => setSide('front')}>
            <Image src='/front.png' alt='' width={88} height={88} className='mx-auto' />
            <div className={`${side === 'front' ? 'bg-primary' : 'bg-transparent'} my-1 h-1 w-full`}></div>
            <div className='text-center text-xs'>Front</div>
          </div>
          <div onClick={() => setSide('back')}>
            <Image src='/back.png' alt='' width={88} height={88} className='mx-auto' />
            <div className={`${side === 'back' ? 'bg-primary' : 'bg-transparent'} my-1 h-1 w-full`}></div>
            <div className='text-center text-xs'>Back</div>
          </div>
        </div>
        <div className='ml-auto w-fit' onClick={e => e.stopPropagation()}>
          <WorkspaceButton
            label='Zoom'
            icon={isZoomedIn ? <RxZoomOut /> : <RxZoomIn />}
            onClick={() => setIsZoomedIn(prev => !prev)}
          />
        </div>
      </div>
    </div>
  );
}
