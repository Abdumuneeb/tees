import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;
  const categories = await prisma.store.findFirst({
    where: {
      slug,
      status: 'active',
      deletedAt: null,
    },
    select: {
      name: true,
      slug: true,
      logo: true,
      bannerColor: true,
    },
  });
  res.status(200).json(categories);
}
