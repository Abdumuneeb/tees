import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

interface Props {
  className?: string;
  rating: number;
}

export default function Rating({ rating, className }: Props) {
  const filledStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - filledStars);
  const emptyStars = 5 - filledStars - halfStars;

  return (
    <div className={`${className} flex space-x-1 text-lg text-yellow-400`}>
      {[...Array(filledStars)].map((_, index) => (
        <BsStarFill key={index} />
      ))}
      {[...Array(halfStars)].map((_, index) => (
        <BsStarHalf key={index} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <BsStar key={index} />
      ))}
    </div>
  );
}
