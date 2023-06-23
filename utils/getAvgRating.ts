const getAvgRating = (
  reviews: {
    rating: number;
  }[]
) => {
  if (reviews.length > 0)
    return reviews.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0) / reviews.length;
  else return 0;
};

export default getAvgRating;
