import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, getServerSession } from '@roq/nextjs';
import { roqClient } from 'server/roq';
import { FilesFetchDto } from 'server/dtos/files-fetch.dto';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Method not allowed' });
    res.end();
  }

  const { limit, offset } = req.query as FilesFetchDto;
  const session = getServerSession(req, res);

  try {
    const { userProfiles } = await roqClient.asUser(session.roqUserId).userProfiles({});

    res.status(200).json(userProfiles);
  } catch (e) {
    res.status(200).json({ data: [], totalCount: 0 });
  }
}

export default function filesHandler(req: NextApiRequest, res: NextApiResponse) {
  return withAuth(req, res)(handler);
}
