import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { owner, userId } = req.body;

    const { id }: any = req.query;

    const data = await client
      .patch(id)
      .set({ owner: owner, userId: userId, postedBy: owner })
      .commit();

    res.status(200).json(data);
  }
}
