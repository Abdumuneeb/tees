'use client';
import PanelHeader from './PanelHeader';
import ToolbarArt from './ToolbarArt';
import TextOptionRange from './TextOptionRange';
import { type Art } from '@/app/design/[productSlug]/[colorId]/page';

interface Props {
  arts: Art[];
  setArts: React.Dispatch<React.SetStateAction<Art[]>>;
  selectedArt: number;
  setSelectedArt: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function EditArt({ arts, setArts, selectedArt, setSelectedArt }: Props) {
  return (
    <>
      <PanelHeader
        title='Upload Art'
        subTitle='Edit Your Artwork'
        text='Our design professionals will select ink colors for you or tell us your preferred colors at checkout.'
      />
      <ToolbarArt arts={arts} setArts={setArts} selectedArt={selectedArt} setSelectedArt={setSelectedArt} />
      <div className='mt-3'>
        <TextOptionRange
          label='Size'
          min={0.2}
          max={10}
          step={0.1}
          value={arts[selectedArt]?.scale}
          onChange={e =>
            setArts(prev =>
              prev.map((art, i) => (i === selectedArt ? { ...art, scale: parseFloat(e.target.value) } : art))
            )
          }
        />
        <TextOptionRange
          label='Rotate'
          min={-360}
          max={360}
          step={15}
          value={arts[selectedArt]?.rotation}
          onChange={e =>
            setArts(prev =>
              prev.map((art, i) => (i === selectedArt ? { ...art, rotation: parseInt(e.target.value) } : art))
            )
          }
        />
      </div>
    </>
  );
}
