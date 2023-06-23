import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;
  const category = req.query.category;
  const minPrice = req.query.minPrice as string | undefined;
  const maxPrice = req.query.maxPrice as string | undefined;
  const page = req.query.page as string | undefined;
  const size = req.query.size;
  const color = req.query.color;
  const sort = req.query.sort;
  const products = await prisma.product.findMany({
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
    select: {
      slug: true,
      title: true,
      thumbnail: true,
      sellPrice: true,
      discount: true,
      Review: {
        select: {
          rating: true,
        },
      },
    },
    take: 12,
    skip: (parseInt(page || '1') - 1) * 12,
    orderBy: {
      purchasePrice: sort === 'pricedesc' ? 'desc' : 'asc',
    },
  });
  res.status(200).json(products);
}
