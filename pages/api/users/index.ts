import type { NextApiRequest, NextApiResponse } from "next";
import UserDao from "../../../Dao/dao.user";
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
  if (req.method === "POST") {
    await dbConnect();
    try {
      const user = await UserDao.addNew(req.body);
      res.status(200).json({
        status: "success",
        payload: user,
        message: "User created",
      });
    } catch (err: any) {
      res.status(500).json({ status: "failed", payload: null, message: err });
    }
  }

  // if (req.method === "GET") {
  //   await dbConnect();
  //   try {
  //     const user = await UserDao.getAll();
  //     res.status(200).json({
  //       status: "success",
  //       payload: user,
  //       message: "fetched all users",
  //     });
  //   } catch (err: any) {
  //     res.status(500).json({ status: "failed", payload: null, message: err });
  //   }
  // }
}
