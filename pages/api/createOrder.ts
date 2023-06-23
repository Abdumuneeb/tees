import prisma from '@/prisma/client';
import dayjs from 'dayjs';
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
          addressId: z.number(),
        });
        const input = bodySchema.parse(req.body);
        const carts = await prisma.cart.findMany({
          where: {
            userId: session.user.id,
          },
          include: {
            productStock: {
              select: {
                product: {
                  select: {
                    store: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
        if (carts.length === 0) return res.status(400).json({ error: 'No cart items' });
        const grandTotal = carts?.reduce(
          (accumulator, currentValue) =>
            accumulator + ((currentValue.price || 0) - (currentValue.discount || 0)) * (currentValue?.quantity || 0),
          0
        );
        const tax = carts?.reduce((accumulator, currentValue) => accumulator + (currentValue?.tax || 0), 0);
        const getCode = () => {
          const storeName: string | undefined = carts[0]?.productStock?.product.store?.name;
          if (storeName)
            return `${storeName.toUpperCase().replace(/ /g, '_')}-${dayjs(new Date()).format(
              'MM-DD-YYYY'
            )}-${Math.floor(1000 + Math.random() * 9000)}`;
          return `atc-${Math.floor(100000 + Math.random() * 900000)}-${Date.now()}`;
        };
        const order = await prisma.order.create({
          data: {
            user: {
              connect: {
                id: session.user.id,
              },
            },
            code: getCode(),
            grandTotal,
            tax,
            address: {
              connect: {
                id: input.addressId,
              },
            },
            paymentStatus: 'not-paid',
          },
        });
        for (const cart of carts) {
          await prisma.orderProduct.create({
            data: {
              orderId: order.id,
              productStockId: cart.productStockId!,
              sizeId: cart.sizeId,
              colorId: cart.colorId,
              quantity: cart.quantity,
              price: cart.price,
              tax: cart.tax,
              discount: cart.discount,
            },
          });
        }
        await prisma.orderStatus.create({
          data: {
            orderId: order.id,
            status: 'AWAITING_PAYMENT',
          },
        });
        await prisma.cart.deleteMany({
          where: {
            userId: session.user.id,
          },
        });
        res.status(200).json({ orderId: order.id });
      } catch (error) {
        res.status(400).json({ error });
      }
    } else {
      res.status(401).json({ error: 'Must be login' });
    }
  }
}
