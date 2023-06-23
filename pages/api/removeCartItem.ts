import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);
    if (session?.user) {
      await prisma.cart.delete({ where: { id: req.body.id } });
      res.status(200).json({ message: 'Removed from cart' });
    } else {
      res.status(401).json({ error: 'Must be login' });
    }
  }
}
