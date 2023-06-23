import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sizes = await prisma.size.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });
  res.status(200).json(sizes);
}
