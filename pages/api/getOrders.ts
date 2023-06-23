import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user) {
    const orders = await prisma.order.findMany({
      where: {
        user: {
          id: session.user.id,
        },
      },
      select: {
        id: true,
        code: true,
        grandTotal: true,
        createdAt: true,
        OrderStatus: {
          select: {
            status: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(orders);
  } else {
    return res.status(401).json({ error: 'Must be login' });
  }
}
