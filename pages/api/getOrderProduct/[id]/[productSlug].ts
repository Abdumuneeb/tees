import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);
  const session = await getServerSession(req, res, authOptions);
  if (session?.user) {
    const review = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        product: {
          slug: req.query.productSlug as string,
        },
        orderProductId: id,
      },
      select: {
        product: {
          select: {
            title: true,
            slug: true,
          },
        },
        review: true,
        rating: true,
        createdAt: true,
      },
    });
    if (review) return res.status(200).json({ type: 'review', data: review });
    const orderProduct = await prisma.orderProduct.findFirst({
      where: {
        id,
        order: {
          OrderStatus: {
            some: {
              status: 'PAID',
            },
          },
          userId: session.user.id,
        },
      },
      select: {
        productStock: {
          select: {
            product: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({ type: 'order', data: orderProduct });
  } else {
    return res.status(401).json({ error: 'Must be login' });
  }
}
