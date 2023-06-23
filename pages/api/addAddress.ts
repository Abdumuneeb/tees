import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (session?.user) {
      try {
        const bodySchema = z.object({
          state: z.string().min(1),
          city: z.string().min(1),
          address: z.string().min(1),
          postalCode: z.string(),
          phone: z.string().min(1),
        });
        const input = bodySchema.parse(req.body);
        await prisma.address.create({
          data: {
            state: input.state,
            city: input.city,
            address: input.address,
            postalCode: input.postalCode,
            phone: input.phone,
            userId: session.user.id,
          },
        });
        res.status(200).json({ message: 'Address added' });
      } catch (error) {
        res.status(400).json({ error });
      }
    } else {
      res.status(401).json({ error: 'Must be login' });
    }
  }
}
