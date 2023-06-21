import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const slugData = await prisma.post.findMany({
    //   select: { tags: true }
    // });
    const slugData = await prisma.post.findMany({
      select: { tags: true }
    });
    console.log('slugData ', slugData);
    let arr: string[] = [];
    slugData.map((tagArr) => {
      tagArr.tags.map((tag) => arr.push(tag));
    });

    // let data = Array.from([...new Set(arr)])

    console.log('slug arr >>', arr);

    return res.status(200).json({
      status: 'success',
      data: arr
    });
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong!', status: 'error' });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getHandler(req, res);

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);

      return res.status(200).json({
        status: 'success',
        msg: 'ohh ho! you might have accessed wrong data!'
      });
  }
}
