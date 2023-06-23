import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const productSlug = req.query.productSlug as string;
  const colorId = req.query.colorId as string;
  const productImages = await prisma.productStockImage.findMany({
    where: {
      productStock: {
        product: {
          slug: productSlug,
        },
        colorId: parseInt(colorId),
      },
    },
    select: {
      fileName: true,
      type: true,
    },
  });
  res.status(200).json(productImages);
}
