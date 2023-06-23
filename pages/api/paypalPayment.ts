import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import paypal from '@paypal/checkout-server-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (session?.user) {
      const order = await prisma.order.findUnique({
        where: {
          id: req.body.orderId,
        },
        select: {
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
      const environment = new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID!,
        process.env.PAYPAL_CLIENT_SECRET!
      );
      const client = new paypal.core.PayPalHttpClient(environment);
      const request = new paypal.orders.OrdersCreateRequest();
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: order.grandTotal.toString(),
            },
          },
        ],
      });
      const response = await client.execute(request);
      if (response.result) {
        await prisma.orderStatus.create({
          data: {
            status: 'PAID',
            orderId: req.body.orderId,
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
      }
      res.status(200).json(response.result.id);
    } else {
      res.status(401).json({ error: 'Must be login' });
    }
  }
}
