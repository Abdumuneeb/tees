import { useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
}

function ControlledRating({ value, onChange }: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => setHoverValue(index + 1);

  const handleMouseLeave = () => setHoverValue(null);

  const handleClick = (index: number) => onChange(index + 1);

  const stars = Array.from({ length: 5 }, (_, index) => {
    const filled = index < Math.floor(hoverValue ?? value);

    return (
      <span
        key={index}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(index)}
      >
        {filled ? <BsStarFill className='hover:scale-110' /> : <BsStar className='hover:scale-110' />}
      </span>
    );
  });

  return <div className='flex cursor-pointer space-x-1 text-lg text-yellow-400'>{stars}</div>;
}

export default ControlledRating;
