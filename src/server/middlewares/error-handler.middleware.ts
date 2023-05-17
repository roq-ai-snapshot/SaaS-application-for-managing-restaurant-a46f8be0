import { NextApiRequest, NextApiResponse } from 'next';

export function errorHandlerMiddleware(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}
