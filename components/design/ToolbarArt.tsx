'use client';
import type { Dispatch, SetStateAction } from 'react';
import { BsLayerForward, BsLayerBackward } from 'react-icons/bs';
import { BiHorizontalCenter, BiDuplicate } from 'react-icons/bi';
import { GiHorizontalFlip, GiVerticalFlip } from 'react-icons/gi';
import { AiFillLock } from 'react-icons/ai';
import ToolbarButtton from './ToolbarButtton';
import ToolbarButttonGroup from './ToolbarButtonGroup';
import { type Art } from '@/app/design/[productSlug]/[colorId]/page';

interface Props {
  arts: Art[];
  setArts: Dispatch<SetStateAction<Art[]>>;
  selectedArt: number | null;
  setSelectedArt: Dispatch<SetStateAction<number | null>>;
}

export default function ToolbarArt({ arts, setArts, selectedArt, setSelectedArt }: Props) {
  return (
    <div className='mt-2 flex justify-between'>
      <ToolbarButtton
        icon={<BiHorizontalCenter />}
        label='Center'
        onClick={() =>
          setArts(prev => prev.map((art, i) => (i === selectedArt ? { ...art, positionX: 0, positionY: 0 } : art)))
        }
      />
      <ToolbarButttonGroup
        options={[
          {
            icon: <BsLayerForward />,
            onClick: () =>
              setArts(prev => prev.map((art, i) => (i === selectedArt ? { ...art, zIndex: art.zIndex + 1 } : art))),
            disabled: selectedArt !== null ? arts[selectedArt]?.zIndex === 1 : false,
          },
          {
            icon: <BsLayerBackward />,
            onClick: () =>
              setArts(prev => prev.map((art, i) => (i === selectedArt ? { ...art, zIndex: art.zIndex - 1 } : art))),
            disabled: selectedArt !== null ? arts[selectedArt]?.zIndex === -1 : false,
          },
        ]}
        label='Layering'
      />
      <ToolbarButttonGroup
        options={[
          {
            icon: <GiHorizontalFlip />,
            onClick: () =>
              setArts(prev =>
                prev.map((art, i) =>
                  i === selectedArt ? { ...art, isFlippedHorizontal: !art.isFlippedHorizontal } : art
                )
              ),
            isActive: selectedArt !== null ? arts[selectedArt]?.isFlippedHorizontal : false,
          },
          {
            icon: <GiVerticalFlip />,
            onClick: () =>
              setArts(prev =>
                prev.map((art, i) => (i === selectedArt ? { ...art, isFlippedVertical: !art.isFlippedVertical } : art))
              ),
            isActive: selectedArt !== null ? arts[selectedArt]?.isFlippedVertical : false,
          },
        ]}
        label='Flip'
      />
      <ToolbarButtton
        icon={<AiFillLock />}
        onClick={() =>
          setArts(prev => prev.map((art, i) => (i === selectedArt ? { ...art, isLocked: !art.isLocked } : art)))
        }
        label='Lock'
        isActive={selectedArt !== null ? arts[selectedArt]?.isLocked : false}
      />
      <ToolbarButtton
        icon={<BiDuplicate />}
        onClick={() => {
          if (selectedArt !== null) {
            setArts(prev => [...prev, arts[selectedArt]]);
            setSelectedArt(arts.length);
          }
        }}
        label='Duplicate'
      />
    </div>
  );
}
