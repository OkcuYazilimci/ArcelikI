import { connectToDB } from "../../../../utils/database";
import { getSession } from 'next-auth/react';
import Blog from '../../../../model/Blog';

export default async function POST (req, res) {
  await connectToDb();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { title, description, image, user } = req.body;

  try {
    const blog = await Blog.create({
      title,
      description,
      image,
      user,
    });

    return res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog entry:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
