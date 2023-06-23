'use client';
import type { Dispatch, SetStateAction } from 'react';
import { BsLayerForward, BsLayerBackward } from 'react-icons/bs';
import { BiHorizontalCenter, BiDuplicate } from 'react-icons/bi';
import { GiHorizontalFlip, GiVerticalFlip } from 'react-icons/gi';
import { AiFillLock } from 'react-icons/ai';
import ToolbarButtton from './ToolbarButtton';
import ToolbarButttonGroup from './ToolbarButtonGroup';
import { type Text } from '@/app/design/[productSlug]/[colorId]/page';

interface Props {
  texts: Text[];
  setTexts: Dispatch<SetStateAction<Text[]>>;
  selectedText: number | null;
  setSelectedText: Dispatch<SetStateAction<number | null>>;
}

export default function Toolbar({ texts, setTexts, selectedText, setSelectedText }: Props) {
  return (
    <div className='mt-2 flex justify-between'>
      <ToolbarButtton
        icon={<BiHorizontalCenter />}
        label='Center'
        onClick={() =>
          setTexts(prev => prev.map((text, i) => (i === selectedText ? { ...text, positionX: 0, positionY: 0 } : text)))
        }
      />
      <ToolbarButttonGroup
        options={[
          {
            icon: <BsLayerForward />,
            onClick: () =>
              setTexts(prev =>
                prev.map((text, i) => (i === selectedText ? { ...text, zIndex: text.zIndex + 1 } : text))
              ),
            disabled: selectedText !== null ? texts[selectedText]?.zIndex === 1 : false,
          },
          {
            icon: <BsLayerBackward />,
            onClick: () =>
              setTexts(prev =>
                prev.map((text, i) => (i === selectedText ? { ...text, zIndex: text.zIndex - 1 } : text))
              ),
            disabled: selectedText !== null ? texts[selectedText]?.zIndex === -1 : false,
          },
        ]}
        label='Layering'
      />
      <ToolbarButttonGroup
        options={[
          {
            icon: <GiHorizontalFlip />,
            onClick: () =>
              setTexts(prev =>
                prev.map((text, i) =>
                  i === selectedText ? { ...text, isFlippedHorizontal: !text.isFlippedHorizontal } : text
                )
              ),
            isActive: selectedText !== null ? texts[selectedText]?.isFlippedHorizontal : false,
          },
          {
            icon: <GiVerticalFlip />,
            onClick: () =>
              setTexts(prev =>
                prev.map((text, i) =>
                  i === selectedText ? { ...text, isFlippedVertical: !text.isFlippedVertical } : text
                )
              ),
            isActive: selectedText !== null ? texts[selectedText]?.isFlippedVertical : false,
          },
        ]}
        label='Flip'
      />
      <ToolbarButtton
        icon={<AiFillLock />}
        onClick={() =>
          setTexts(prev => prev.map((text, i) => (i === selectedText ? { ...text, isLocked: !text.isLocked } : text)))
        }
        label='Lock'
        isActive={selectedText !== null ? texts[selectedText]?.isLocked : false}
      />
      <ToolbarButtton
        icon={<BiDuplicate />}
        onClick={() => {
          if (selectedText !== null) {
            setTexts(prev => [...prev, texts[selectedText]]);
            setSelectedText(texts.length);
          }
        }}
        label='Duplicate'
      />
    </div>
  );
}
