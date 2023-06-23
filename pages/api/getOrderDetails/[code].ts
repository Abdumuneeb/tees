import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;
  const session = await getServerSession(req, res, authOptions);
  if (session?.user) {
    const order = await prisma.order.findFirst({
      where: {
        code,
        user: {
          id: session.user.id,
        },
      },
      select: {
        OrderStatus: {
          select: {
            status: true,
          },
        },
        OrderProduct: {
          select: {
            id: true,
            productStock: {
              select: {
                product: {
                  select: {
                    title: true,
                    sku: true,
                    thumbnail: true,
                    slug: true,
                  },
                },
                ProductStockImage: {
                  select: {
                    fileName: true,
                  },
                },
              },
            },
            quantity: true,
            price: true,
            discount: true,
            color: {
              select: {
                title: true,
              },
            },
            size: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(order);
  } else {
    return res.status(401).json({ error: 'Must be login' });
  }
}
