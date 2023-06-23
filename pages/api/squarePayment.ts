import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { Client, Environment } from 'square';
import { randomUUID } from 'crypto';
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (session?.user) {
      const order = await prisma.order.findUnique({
        where: {
          id: req.body.orderId,
        },
        select: {
          id: true,
          OrderStatus: {
            select: {
              status: true,
            },
          },
          grandTotal: true,
        },
      });
      if (!order) return res.status(400).json({ error: 'No order to pay' });
      const alreadyPaid = order.OrderStatus.some(el => el.status === 'PAID');
      if (alreadyPaid) return res.status(400).json({ error: 'Order already paid' });
      const { paymentsApi } = new Client({
        accessToken: process.env.SQUARE_CLIENT_SECRET,
        environment: Environment.Sandbox,
      });
      const { result } = await paymentsApi.createPayment({
        idempotencyKey: randomUUID(),
        sourceId: req.body.sourceId,
        amountMoney: {
          currency: 'USD',
          amount: BigInt(order.grandTotal * 100),
        },
      });
      await prisma.orderStatus.create({
        data: {
          status: 'PAID',
          orderId: order.id,
        },
      });
      await prisma.order.update({
        where: {
          id: req.body.orderId,
        },
        data: {
          paymentStatus: 'paid',
        },
      });
      res.status(200).json(result);
    } else {
      res.status(401).json({ error: 'Must be login' });
    }
  }
}
