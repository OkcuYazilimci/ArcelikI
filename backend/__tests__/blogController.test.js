import supertest from 'supertest';
import app from '../app.js'; // Adjust this path to where your Express app is initialized
import Blog from '../model/Blog.js'; // Adjust path to your Blog model
import User from '../model/User.js'; // Adjust path to your User model

// Mock Mongoose models
jest.mock('../model/Blog.js', () => ({
  find: jest.fn(),
}));
jest.mock('../model/User.js', () => ({
  find: jest.fn(),
}));

describe('/api-blogs/search endpoint', () => {
  it('should search blogs and users and return results', async () => {
    const mockBlogs = [{ title: 'Test Blog', description: 'A test blog' }];
    const mockUsers = [{ displayName: 'Test User', _id: 'user123', email: 'test@example.com' }];
    Blog.find.mockResolvedValue(mockBlogs);
    User.find.mockResolvedValue(mockUsers);

    const response = await supertest(app)
      .get('/api-blogs/search')
      .query({ search: 'Test' })
      .expect(200);

    expect(Blog.find).toHaveBeenCalled();
    expect(User.find).toHaveBeenCalled();
    expect(response.body).toEqual({
      blogResult: mockBlogs,
      userResult: expect.arrayContaining([
        expect.objectContaining({
          displayName: 'Test User'
        })
      ]),
    });
  });
});

