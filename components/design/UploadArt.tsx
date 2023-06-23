'use client';
import Dropzone from 'react-dropzone';
import FileTypeInfo from './FileTypeInfo';
import PanelHeader from './PanelHeader';
import fileToBase64 from '@/utils/fileToBase64';
import { type Art } from '@/app/design/[productSlug]/[colorId]/page';

interface Props {
  arts: Art[];
  setArts: React.Dispatch<React.SetStateAction<Art[]>>;
  selectedArt: number | null;
  setSelectedArt: React.Dispatch<React.SetStateAction<number | null>>;
  side: 'front' | 'back';
}

export default function UploadArt({ arts, setArts, selectedArt, setSelectedArt, side }: Props) {
  return (
    <>
      <PanelHeader
        title='Upload Art'
        subTitle='Choose file(s) to upload'
        text='Our design professionals will select ink colors for you or tell us your preferred colors with Design Notes.'
      />
      <Dropzone
        onDrop={acceptedFiles =>
          acceptedFiles.forEach(async file =>
            setArts([
              ...arts,
              {
                data: await fileToBase64(file),
                positionX: 0,
                positionY: 0,
                zIndex: 0,
                isFlippedHorizontal: false,
                isFlippedVertical: false,
                isLocked: false,
                scale: 1,
                rotation: 0,
                side,
              },
            ])
          )
        }
      >
        {({ getRootProps }) => (
          <div className='border-2 border-dashed border-gray-x11 p-5 text-center text-sm' {...getRootProps()}>
            <div className='mb-2'>Drag & Drop Artwork Files or</div>
            <button className='btn items-center px-4 py-2.5 normal-case'>Choose File(s)</button>
          </div>
        )}
      </Dropzone>
      <FileTypeInfo />
    </>
  );
}
