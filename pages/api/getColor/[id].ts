import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const colors = await prisma.color.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      title: true,
      slug: true,
      code: true,
    },
  });
  res.status(200).json(colors);
}
