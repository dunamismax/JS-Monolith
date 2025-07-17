import { postsCollection } from '@js-monolith/database';
import { ObjectId } from 'mongodb';

export async function postsRoutes(fastify, _options) {
  const posts = await postsCollection();

  try {
    await posts.createIndex({ createdAt: -1 });
    await posts.createIndex({ slug: 1 }, { unique: true });
  } catch (error) {
    fastify.log.warn('Index creation warning:', error.message);
  }

  const samplePosts = [
    {
      _id: new ObjectId(),
      title: 'Welcome to js-monolith',
      slug: 'welcome-to-js-monolith',
      content:
        'This is the first post in our pure JavaScript monorepo blog. Built with Fastify, MongoDB, and Vanilla JS for maximum performance.',
      excerpt:
        'Welcome to our high-performance JavaScript blog built with modern tools.',
      author: 'dunamismax',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['javascript', 'monorepo', 'fastify', 'mongodb'],
    },
    {
      _id: new ObjectId(),
      title: 'Building High-Performance Web Applications',
      slug: 'building-high-performance-web-applications',
      content:
        'Learn how to build lightning-fast web applications using pure JavaScript, esbuild, and modern web standards.',
      excerpt:
        'Discover the secrets to creating blazing-fast web applications.',
      author: 'dunamismax',
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 86400000),
      tags: ['performance', 'web-development', 'javascript', 'esbuild'],
    },
    {
      _id: new ObjectId(),
      title: 'Web Components: The Future of UI Development',
      slug: 'web-components-future-ui-development',
      content:
        'Explore how Web Components provide a framework-agnostic way to build reusable UI elements with native browser APIs.',
      excerpt:
        'Web Components offer a powerful way to create reusable UI elements.',
      author: 'dunamismax',
      createdAt: new Date(Date.now() - 172800000),
      updatedAt: new Date(Date.now() - 172800000),
      tags: ['web-components', 'ui', 'javascript', 'standards'],
    },
  ];

  const existingPosts = await posts.countDocuments();
  if (existingPosts === 0) {
    await posts.insertMany(samplePosts);
  }

  fastify.get('/posts', async (request, reply) => {
    try {
      const { page = 1, limit = 10 } = request.query;
      
      const pageNum = Math.max(1, Math.min(100, parseInt(page) || 1));
      const limitNum = Math.max(1, Math.min(50, parseInt(limit) || 10));
      const skip = (pageNum - 1) * limitNum;

      const postsList = await posts
        .find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .toArray();

      const total = await posts.countDocuments();

      return {
        posts: postsList,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      };
    } catch (error) {
      fastify.log.error('Get posts error:', error);
      reply.code(500).send({ error: 'Failed to fetch posts' });
    }
  });

  fastify.get('/posts/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      
      if (!id || typeof id !== 'string' || id.length > 100) {
        reply.code(400).send({ error: 'Invalid post ID' });
        return;
      }
      
      let post;

      if (ObjectId.isValid(id) && id.length === 24) {
        try {
          post = await posts.findOne({ _id: new ObjectId(id) });
        } catch (objectIdError) {
          fastify.log.warn('Invalid ObjectId:', id);
          reply.code(400).send({ error: 'Invalid post ID format' });
          return;
        }
      } else {
        const sanitizedSlug = id.replace(/[^a-zA-Z0-9-_]/g, '');
        post = await posts.findOne({ slug: sanitizedSlug });
      }

      if (!post) {
        reply.code(404).send({ error: 'Post not found' });
        return;
      }

      return { post };
    } catch (error) {
      fastify.log.error('Get post error:', error);
      reply.code(500).send({ error: 'Failed to fetch post' });
    }
  });
}
