import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;
  const categories = await prisma.category.findMany({
    where: {
      status: 'active',
      deletedAt: null,
      parent: {
        slug,
      },
    },
    select: {
      title: true,
      slug: true,
      description: true,
      image: true,
      parent: {
        select: {
          title: true,
        },
      },
    },
  });
  res.status(200).json(categories);
}
