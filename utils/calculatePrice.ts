type QuantityRange = [number, number];
type PriceMap = Map<QuantityRange, number[]>;

const pricePerPieceMap: PriceMap = new Map([
  [
    [0, 23],
    [1.83, 3.1, 4.04, 4.99, 5.93, 6.88],
  ],
  [
    [24, 47],
    [1.73, 2.67, 3.62, 4.58, 5.31, 5.62],
  ],
  [
    [48, 95],
    [1.63, 2.26, 2.89, 3.53, 4.16, 4.78],
  ],
  [
    [96, 191],
    [1.56, 2.07, 2.57, 3.09, 3.59, 4.09],
  ],
  [
    [192, 383],
    [1.39, 1.77, 2.15, 2.53, 2.9, 3.28],
  ],
  [
    [384, 767],
    [1.17, 1.43, 1.68, 1.93, 2.18, 2.44],
  ],
  [
    [768, 1535],
    [0.98, 1.16, 1.35, 1.54, 1.73, 1.92],
  ],
  [
    [1536, 3071],
    [0.77, 1.05, 1.18, 1.33, 1.46, 1.6],
  ],
  [
    [3072, Infinity],
    [0.66, 0.79, 0.89, 1, 1.1, 1.2],
  ],
]);

export default function calculatePrice(quantity: number, colors: number): number {
  let price: number = 0;

  const priceRange = Array.from(pricePerPieceMap.keys()).find(
    ([lowerBound, upperBound]) => quantity >= lowerBound && quantity <= upperBound
  );

  if (priceRange) {
    const prices = pricePerPieceMap.get(priceRange);

    if (colors >= 1 && colors <= prices!.length) {
      price = prices![colors - 1];
    }
  }

  return price;
}
