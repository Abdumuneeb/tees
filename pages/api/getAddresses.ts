import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user) {
    const addresses = await prisma.address.findMany({
      where: {
        user: {
          id: session.user.id,
        },
      },
      select: {
        id: true,
        address: true,
        city: true,
        state: true,
        postalCode: true,
        phone: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(addresses);
  } else {
    res.status(401).json({ error: 'Must be login' });
  }
}
