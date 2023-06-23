import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
    select: {
      title: true,
      sellPrice: true,
      discount: true,
      thumbnail: true,
      tax: true,
    },
  });
  res.status(200).json(product);
}
