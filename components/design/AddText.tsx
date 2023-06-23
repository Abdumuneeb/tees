'use client';
import type { Dispatch, SetStateAction } from 'react';
import PanelHeader from './PanelHeader';
import SelectLanguage from './SelectLanguage';
import TextOption from './TextOption';
import TextOptionRange from './TextOptionRange';
import Toolbar from './Toolbar';
import { type Text } from '@/app/design/[productSlug]/[colorId]/page';

interface Props {
  texts: Text[];
  setTexts: Dispatch<SetStateAction<Text[]>>;
  selectedText: number | null;
  setSelectedText: Dispatch<SetStateAction<number | null>>;
  side: 'front' | 'back';
}

export default function AddText({ texts, setTexts, selectedText, setSelectedText, side }: Props) {
  return (
    <>
      <PanelHeader title='Text Editor' subTitle='Add New Text' />
      <SelectLanguage />
      <textarea
        className='mt-2 w-full resize-none border-american-silver'
        rows={3}
        placeholder='Begin Typing...'
        autoFocus
        value={selectedText !== null ? texts[selectedText]?.value : ''}
        onChange={e => {
          if (selectedText !== null) {
            setTexts(prev => prev.map((text, i) => (i === selectedText ? { ...text, value: e.target.value } : text)));
          } else {
            setSelectedText(texts.length);
            setTexts(prev => [
              ...prev,
              {
                value: e.target.value,
                positionX: 0,
                positionY: 0,
                zIndex: 0,
                isFlippedHorizontal: false,
                isFlippedVertical: false,
                isLocked: false,
                fontFamily: 'sans-serif',
                color: '#000000',
                outlineColor: '#000000',
                outlineSize: 0,
                scale: 1,
                rotation: 0,
                letterSpacing: 2,
                side: side,
              },
            ]);
          }
        }}
      ></textarea>
      {selectedText !== null && (
        <>
          <Toolbar texts={texts} setTexts={setTexts} selectedText={selectedText} setSelectedText={setSelectedText} />
          <div className='mt-3'>
            <TextOption label='Font'>
              <span className='text-xl font-extrabold'>Montserrat</span>
            </TextOption>
            <TextOption label='Color'>
              <input
                type='color'
                className='h-6 w-6'
                value={texts[selectedText]?.color}
                onChange={e =>
                  setTexts(prev =>
                    prev.map((text, i) => (i === selectedText ? { ...text, color: e.target.value } : text))
                  )
                }
              ></input>
            </TextOption>
            <TextOption label='Outline'>
              <input
                type='color'
                className='h-6 w-6'
                value={texts[selectedText]?.outlineColor}
                onChange={e =>
                  setTexts(prev =>
                    prev.map((text, i) => (i === selectedText ? { ...text, outlineColor: e.target.value } : text))
                  )
                }
              ></input>
            </TextOption>
            <TextOptionRange
              label='Outline Size'
              min={0}
              max={20}
              step={1}
              value={texts[selectedText]?.outlineSize}
              onChange={e =>
                setTexts(prev =>
                  prev.map((text, i) =>
                    i === selectedText ? { ...text, outlineSize: parseInt(e.target.value) } : text
                  )
                )
              }
            />
            <TextOptionRange
              label='Size'
              min={0.2}
              max={10}
              step={0.1}
              value={texts[selectedText]?.scale}
              onChange={e =>
                setTexts(prev =>
                  prev.map((text, i) => (i === selectedText ? { ...text, scale: parseFloat(e.target.value) } : text))
                )
              }
            />
            {/* <TextOptionRange
              label='Arc'
              min={-360}
              max={360}
              step={15}
              value={texts[selectedText]?.outlineSize}
              onChange={e =>
                setTexts(prev =>
                  prev.map((text, i) =>
                    i === selectedText ? { ...text, outlineSize: parseInt(e.target.value) } : text
                  )
                )
              }
            /> */}
            <TextOptionRange
              label='Rotate'
              min={-360}
              max={360}
              step={15}
              value={texts[selectedText]?.rotation}
              onChange={e =>
                setTexts(prev =>
                  prev.map((text, i) => (i === selectedText ? { ...text, rotation: parseInt(e.target.value) } : text))
                )
              }
            />
            <TextOptionRange
              label='Spacing'
              min={-10}
              max={10}
              step={1}
              value={texts[selectedText]?.letterSpacing}
              onChange={e =>
                setTexts(prev =>
                  prev.map((text, i) =>
                    i === selectedText ? { ...text, letterSpacing: parseInt(e.target.value) } : text
                  )
                )
              }
            />
          </div>
        </>
      )}
    </>
  );
}
