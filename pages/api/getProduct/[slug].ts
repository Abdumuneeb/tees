import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
    select: {
      store: {
        select: {
          slug: true,
        },
      },
      title: true,
      slug: true,
      sellPrice: true,
      unitPrice: true,
      discount: true,
      description: true,
      thumbnail: true,
      sku: true,
      tax: true,
      ProductStock: {
        select: {
          color: {
            select: {
              title: true,
              id: true,
              code: true,
            },
          },
          size: {
            select: {
              title: true,
              id: true,
            },
          },
          price: true,
          ProductStockImage: {
            select: {
              fileName: true,
              type: true,
            },
          },
          id: true,
        },
      },
    },
  });
  res.status(200).json(product);
}
