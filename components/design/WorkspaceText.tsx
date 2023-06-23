'use client';
import { type Text } from '@/app/design/[productSlug]/[colorId]/page';
import { type Dispatch, type SetStateAction } from 'react';
import Draggable from 'react-draggable';
import { BsTrash } from 'react-icons/bs';

interface Props {
  text: Text;
  setTexts: Dispatch<SetStateAction<Text[]>>;
  selectedText: number | null;
  setSelectedText: Dispatch<SetStateAction<number | null>>;
  i: number;
}

export default function WorkspaceText({ setSelectedText, text, i, selectedText, setTexts }: Props) {
  return (
    <Draggable
      disabled={text.isLocked}
      position={{ x: text.positionX, y: text.positionY }}
      onStop={(_, data) =>
        setTexts(prev =>
          prev.map((text, i) => (i === selectedText ? { ...text, positionX: data.x, positionY: data.y } : text))
        )
      }
      scale={text.scale}
    >
      <div
        onClick={() => setSelectedText(i)}
        className={`${i === selectedText ? 'border-primary' : 'border-transparent'} w-min border border-dashed p-1`}
        style={{
          zIndex: text.zIndex,
          fontFamily: text.fontFamily,
          color: text.color,
          WebkitTextStrokeColor: text.outlineColor,
          WebkitTextStrokeWidth: text.outlineSize,
          scale: `${text.isFlippedHorizontal ? `-${text.scale}` : text.scale} ${
            text.isFlippedVertical ? `-${text.scale}` : text.scale
          }`,
          rotate: `${text.rotation}deg`,
          letterSpacing: `${text.letterSpacing}px`,
          cursor: 'move',
        }}
      >
        <span>{text.value}</span>
        {i === selectedText && (
          <>
            <button
              onClick={() => {
                const selectTextCopy = selectedText;
                setSelectedText(null);
                setTexts(prev => prev.filter((_, i) => i !== selectTextCopy));
              }}
              className='absolute -top-[1.4375rem] -left-[1.4375rem] grid h-6 w-6 place-content-center rounded-full border border-american-silver text-[0.8125rem] text-outer-space-2 hover:bg-sunset-orange hover:text-white'
            >
              <BsTrash />
            </button>
          </>
        )}
      </div>
    </Draggable>
  );
}
