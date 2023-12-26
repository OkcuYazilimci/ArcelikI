import { connectToDB } from "../../../../utils/database";
import Blog from "../../../../model/Blog";
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { title, description, image } = req.body;
  const userId = session.user.id;

  try {
    await connectToDB(); // Connect to the MongoDB database

    // Create a new blog entry using Mongoose
    const blog = new Blog({
      title,
      description,
      image,
      user: userId,
    });

    // Save the blog entry to the database
    const result = await blog.save();

    return res.status(201).json(result);
  } catch (error) {
    console.error('Error adding blog entry:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
