import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        phone: true,
        name: true,
      },
    });
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: 'Must be login' });
  }
}
