import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getOrder_items();
    case 'PUT':
      return updateOrder_items();
    case 'DELETE':
      return deleteOrder_items();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOrder_items() {
    const data = await prisma.order_items.findFirst({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }

  async function updateOrder_items() {
    const data = await prisma.order_items.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteOrder_items() {
    const data = await prisma.order_items.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
