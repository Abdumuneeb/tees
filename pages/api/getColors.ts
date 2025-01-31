import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const colors = await prisma.color.findMany({
    select: {
      title: true,
      slug: true,
      code: true,
    },
  });
  res.status(200).json(colors);
}
