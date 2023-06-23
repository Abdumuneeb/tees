import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const stores = await prisma.store.findMany({
    select: {
      name: true,
      slug: true,
    },
    where: {
      status: 'active',
      deletedAt: null,
    },
  });
  res.status(200).json(stores);
}
