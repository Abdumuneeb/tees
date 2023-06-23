import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;
  const sizes = await prisma.size.findMany({
    where: {
      ProductStock: {
        some: {
          product: {
            store: {
              slug,
            },
          },
        },
      },
    },
    select: {
      title: true,
      slug: true,
    },
  });
  res.status(200).json(sizes);
}
