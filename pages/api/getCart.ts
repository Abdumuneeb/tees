import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  let carts;
  if (session?.user) {
    carts = await prisma.cart.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        quantity: true,
        price: true,
        discount: true,
        isDesign: true,
        title: true,
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
        product: {
          select: {
            title: true,
            slug: true,
            sku: true,
            thumbnail: true,
          },
        },
        productStock: {
          select: {
            ProductStockImage: {
              select: {
                fileName: true,
              },
            },
          },
        },
        CartDesignSize: {
          select: {
            size: {
              select: {
                title: true,
              },
            },
            quantity: true,
          },
        },
        CartDesignFile: {
          select: {
            designFile: true,
          },
        },
      },
    });
  } else {
    return res.status(401).json({ error: 'Must be login' });
  }
  res.status(200).json(carts);
}
