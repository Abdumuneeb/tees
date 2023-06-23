import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const session = await getServerSession(req, res, authOptions);
    if (session?.user) {
      try {
        const bodySchema = z.object({
          name: z.string().min(1),
          phone: z.string(),
        });
        const input = bodySchema.parse(req.body);
        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            name: input.name,
            phone: input.phone,
          },
        });
        res.status(200).json({ message: 'Profile updated' });
      } catch (error) {
        res.status(400).json({ error });
      }
    } else {
      res.status(401).json({ error: 'Must be login' });
    }
  }
}
