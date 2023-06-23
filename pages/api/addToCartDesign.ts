import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { z } from 'zod';
import calculatePrice from '@/utils/calculatePrice';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (session?.user) {
      const bodySchema = z.object({
        noOfColors: z.number().int().positive().min(1),
        productSlug: z.string(),
        colorId: z.number(),
        designFiles: z.array(z.string()).length(2),
        sizeQuantities: z.record(z.number().int().positive()),
        title: z.string().nonempty(),
      });
      const body = bodySchema.parse(req.body);
      const quantity = Object.values(body.sizeQuantities).reduce((acc, value) => acc + value, 0);
      const product = await prisma.product.findFirst({
        where: {
          slug: body.productSlug,
        },
        select: {
          id: true,
          discount: true,
          sellPrice: true,
          tax: true,
        },
      });
      if (!product) return res.status(400).json({ error: 'Product not found' });
      const cart = await prisma.cart.create({
        data: {
          quantity: quantity,
          noOfColors: body.noOfColors,
          productId: product.id,
          userId: session.user.id,
          colorId: body.colorId,
          price:
            ((product.sellPrice || 0) -
              (product.discount || 0) +
              (product.tax || 0) +
              calculatePrice(quantity, body.noOfColors)) *
            quantity,
          isDesign: true,
          title: body.title,
        },
      });
      await prisma.cartDesignFile.create({
        data: {
          cartId: cart.id,
          userId: session.user.id,
          designFile: body.designFiles[0],
          type: 'front',
        },
      });
      await prisma.cartDesignFile.create({
        data: {
          cartId: cart.id,
          userId: session.user.id,
          designFile: body.designFiles[1],
          type: 'back',
        },
      });
      for (const [sizeId, quantity] of Object.entries(body.sizeQuantities)) {
        await prisma.cartDesignSize.create({
          data: {
            cartId: cart.id,
            userId: session.user.id,
            sizeId: parseInt(sizeId),
            quantity,
          },
        });
      }
      res.status(200).json({ message: 'Added to cart' });
    } else {
      res.status(401).json({ error: 'Must be login' });
    }
  }
}
