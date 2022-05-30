import type { NextApiRequest, NextApiResponse } from "next";
import VideoDao from "../../Dao/dao.video";
import dbConnect from "../../util/mongo";
import cloud from "../../cloudinaryConfig";

type Data = {
  status: string;
  payload: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    await dbConnect();
    try {
      const videoUrl = await cloud.videoUploads(req.body.video);
      const thumbnailUrl = await cloud.thumbnailUploads(req.body.thumbnail);
      req.body.video = videoUrl.url;
      req.body.thumbnail = thumbnailUrl.url;
      const video = await VideoDao.addNew(req.body);
      res.status(200).json({
        status: "success",
        payload: video,
        message: "video uploaded  successfully!",
      });
    } catch (err: any) {
      res.status(500).json({ status: "failed", payload: null, message: err });
    }
  }
}
