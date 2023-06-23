import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
      status: 'active',
      deletedAt: null,
    },
    select: {
      title: true,
      slug: true,
      image: true,
    },
  });
  res.status(200).json(categories);
}
