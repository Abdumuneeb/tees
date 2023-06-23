import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (session?.user) {
      const product = await prisma.product.findFirst({
        where: {
          slug: req.body.productSlug,
        },
        select: {
          id: true,
          sellPrice: true,
          tax: true,
          discount: true,
        },
      });
      const quantity = req.body.quantity;
      if (!product || !quantity) {
        return res.status(400).json({ error: 'No product to add' });
      }
      let productStock;
      if (req.body.productStockId) {
        productStock = await prisma.productStock.findUnique({
          where: {
            id: req.body.productStockId,
          },
          select: {
            id: true,
            sizeId: true,
            colorId: true,
            price: true,
          },
        });
      }
      const alreadyExist = await prisma.cart.findFirst({
        where: {
          productStockId: productStock?.id,
        },
        select: {
          id: true,
          quantity: true,
        },
      });
      if (alreadyExist) {
        await prisma.cart.update({
          where: {
            id: alreadyExist.id,
          },
          data: {
            quantity: alreadyExist.quantity + quantity,
          },
        });
      } else {
        await prisma.cart.create({
          data: {
            userId: session.user.id,
            productId: product.id,
            productStockId: productStock?.id,
            sizeId: productStock?.sizeId,
            colorId: productStock?.colorId,
            quantity,
            price: productStock?.price || product.sellPrice,
            tax: product.tax,
            discount: product.discount,
          },
        });
      }
      res.status(200).json({ message: 'Added to cart' });
    } else {
      res.status(401).json({ error: 'Must be login' });
    }
  }
}
