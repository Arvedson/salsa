import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/db/mongodb';
import User from "../../../lib/db/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await connectToDatabase(); // Ya no necesitas pasar la URI aquí

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
