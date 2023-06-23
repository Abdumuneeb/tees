import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;
  const reviews = await prisma.review.findMany({
    where: {
      product: {
        slug,
      },
    },
    select: {
      id: true,
      rating: true,
      review: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  res.status(200).json(reviews);
}
