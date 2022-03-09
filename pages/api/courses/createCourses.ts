import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// type Data = {
//   name: string;
// };

export default async function handler(  req: NextApiRequest,  res: NextApiResponse<any>) {
    if (req.method === 'GET'){
        const courses = await prisma.course.findMany();
        console.log(courses);
        res.status(200).json({datos: courses});
    } else if (req.method === 'POST') {
        const data = req.body;
        const course = await prisma.course.create({
            data: {
                name: data.name,
                hours: data.hours,
                platform: data.platform,
                link: data.link
            }
        })
    }
  
}