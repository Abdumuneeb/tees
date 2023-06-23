import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const id = parseInt(req.query.id as string);
    const session = await getServerSession(req, res, authOptions);
    if (session?.user) {
      await prisma.address.deleteMany({
        where: {
          id,
          userId: session.user.id,
        },
      });
      res.status(200).json({ message: 'Address deleted' });
    }
  }
}
