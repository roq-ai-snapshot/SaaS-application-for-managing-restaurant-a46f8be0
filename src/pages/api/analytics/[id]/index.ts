import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getAnalytics();
    case 'PUT':
      return updateAnalytics();
    case 'DELETE':
      return deleteAnalytics();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAnalytics() {
    const data = await prisma.analytics.findFirst({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }

  async function updateAnalytics() {
    const data = await prisma.analytics.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteAnalytics() {
    const data = await prisma.analytics.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
