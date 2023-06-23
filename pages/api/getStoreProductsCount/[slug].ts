import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;
  const category = req.query.category;
  const minPrice = req.query.minPrice as string | undefined;
  const maxPrice = req.query.maxPrice as string | undefined;
  const size = req.query.size;
  const color = req.query.color;
  const productsCount = await prisma.product.count({
    where: {
      store: {
        slug,
        status: 'active',
        deletedAt: null,
      },
      ProductCategory: {
        some: {
          category: {
            StoreCategory: {
              some: {
                store: {
                  slug,
                },
                category: {
                  slug: {
                    in: category,
                  },
                },
              },
            },
          },
        },
      },
      sellPrice: {
        gte: minPrice ? parseInt(minPrice) : undefined,
        lte: maxPrice ? parseInt(maxPrice) : undefined,
      },
      ProductStock: {
        some: {
          size: size
            ? {
                slug: {
                  in: size,
                },
              }
            : {},
          color: color
            ? {
                slug: {
                  in: color,
                },
              }
            : {},
        },
      },
    },
  });
  res.status(200).json(productsCount);
}
