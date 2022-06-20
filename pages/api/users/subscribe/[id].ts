import type { NextApiRequest, NextApiResponse } from "next";
import UserDao from "../../../../Dao/dao.user";
import dbConnect from "../../../../util/mongo";

type Data = {
  status: string;
  payload: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    await dbConnect();
    try {
      const { id } = req.query;
      const { incrementSub } = req.body;
      console.log("incrementSub", incrementSub);
      await UserDao.subscribe(id, incrementSub);
      res.status(200).json({
        status: "success",
        payload: null,
        message: "subscribed",
      });
    } catch (err: any) {
      res.status(500).json({ status: "failed", payload: null, message: err });
    }
  }
}
