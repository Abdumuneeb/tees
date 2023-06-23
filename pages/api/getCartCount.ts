import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  let cartCount;
  if (session?.user) {
    cartCount = await prisma.cart.count({ where: { userId: session.user.id } });
  } else {
    cartCount = 0;
  }
  res.status(200).json(cartCount);
}
