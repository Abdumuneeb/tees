import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;
  const rating = await prisma.review.aggregate({
    where: {
      product: {
        slug,
      },
    },
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
  });
  res.status(200).json(rating);
}
