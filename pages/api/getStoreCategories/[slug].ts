import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;
  const categories = await prisma.storeCategory.findMany({
    where: {
      store: {
        slug,
        status: 'active',
        deletedAt: null,
      },
    },
    select: {
      category: {
        select: {
          title: true,
          slug: true,
          image: true,
        },
      },
      image: true,
    },
  });
  res.status(200).json(categories);
}
