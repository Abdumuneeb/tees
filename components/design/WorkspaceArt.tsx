'use client';
import { type Dispatch, type SetStateAction } from 'react';
import Draggable from 'react-draggable';
import { BsTrash } from 'react-icons/bs';
import { type Art } from '@/app/design/[productSlug]/[colorId]/page';

interface Props {
  art: Art;
  setArts: Dispatch<SetStateAction<Art[]>>;
  selectedArt: number | null;
  setSelectedArt: Dispatch<SetStateAction<number | null>>;
  i: number;
}

export default function WorkspaceArt({ setSelectedArt, art, i, selectedArt, setArts }: Props) {
  return (
    <Draggable
      disabled={art.isLocked}
      position={{ x: art.positionX, y: art.positionY }}
      onStop={(_, data) =>
        setArts(prev =>
          prev.map((art, i) => (i === selectedArt ? { ...art, positionX: data.x, positionY: data.y } : art))
        )
      }
      scale={art.scale}
    >
      <div
        onClick={() => setSelectedArt(i)}
        className={`${i === selectedArt ? 'border-primary' : 'border-transparent'} w-min border border-dashed p-1`}
        style={{
          zIndex: art.zIndex,
          scale: `${art.isFlippedHorizontal ? `-${art.scale}` : art.scale} ${
            art.isFlippedVertical ? `-${art.scale}` : art.scale
          }`,
          rotate: `${art.rotation}deg`,
          cursor: 'move',
        }}
      >
        <img src={art.data} alt='' width={200} className='max-w-none' />
        {i === selectedArt && (
          <>
            <button
              onClick={() => {
                const selectArtCopy = selectedArt;
                setSelectedArt(null);
                setArts(prev => prev.filter((_, i) => i !== selectArtCopy));
              }}
              className='art-[0.8125rem] art-outer-space-2 hover:art-white absolute -top-[1.4375rem] -left-[1.4375rem] grid h-6 w-6 place-content-center rounded-full border border-american-silver hover:bg-sunset-orange hover:text-white'
            >
              <BsTrash />
            </button>
          </>
        )}
      </div>
    </Draggable>
  );
}
