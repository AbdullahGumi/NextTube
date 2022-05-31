import type { NextApiRequest, NextApiResponse } from "next";
import VideoDao from "../../../Dao/dao.video";
import dbConnect from "../../../util/mongo";

type Data = {
  status: string;
  payload: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    await dbConnect();
    try {
      const { id } = req.query.id;
      const video = await VideoDao.getVideo(id);
      res.status(200).json({
        status: "success",
        payload: video,
        message: "fetched",
      });
    } catch (err: any) {
      res.status(500).json({ status: "failed", payload: null, message: err });
    }
  }
}
