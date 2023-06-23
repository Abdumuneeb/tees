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
          productId: z.number(),
          orderProductId: z.number(),
          rating: z.number().min(1).max(5),
          review: z.string().nullable(),
        });
        const input = bodySchema.parse(req.body);
        const order = await prisma.order.findFirst({
          where: {
            OrderProduct: {
              some: {
                id: input.orderProductId,
              },
            },
            userId: session.user.id,
            OrderStatus: {
              some: {
                status: 'PAID',
              },
            },
          },
        });
        if (!order) return res.status(403).json({ error: 'Order not paid' });
        const alreadyReviewed = await prisma.review.findFirst({
          where: {
            userId: session.user.id,
            productId: input.productId,
            orderProductId: input.orderProductId,
          },
        });
        if (alreadyReviewed) return res.status(403).json({ error: 'Already reviewed' });
        await prisma.review.create({
          data: {
            reviewType: 'PRODUCT',
            userId: session.user.id,
            productId: input.productId,
            orderProductId: input.orderProductId,
            status: 'PENDING',
            rating: input.rating,
            review: input.review,
          },
        });
        res.status(200).json({ message: 'Review Added' });
      } catch (error) {
        res.status(400).json({ error });
      }
    } else {
      res.status(401).json({ error: 'Must be login' });
    }
  }
}
