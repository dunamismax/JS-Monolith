import { postsCollection } from "@js-monolith/database";
import { ObjectId } from "mongodb";

export async function postsRoutes(fastify, _options) {
  const posts = await postsCollection();

  await posts.createIndex({ createdAt: -1 });
  await posts.createIndex({ slug: 1 }, { unique: true });

  const samplePosts = [
    {
      _id: new ObjectId(),
      title: "Welcome to js-monolith",
      slug: "welcome-to-js-monolith",
      content:
        "This is the first post in our pure JavaScript monorepo blog. Built with Fastify, MongoDB, and Vanilla JS for maximum performance.",
      excerpt:
        "Welcome to our high-performance JavaScript blog built with modern tools.",
      author: "dunamismax",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ["javascript", "monorepo", "fastify", "mongodb"],
    },
    {
      _id: new ObjectId(),
      title: "Building High-Performance Web Applications",
      slug: "building-high-performance-web-applications",
      content:
        "Learn how to build lightning-fast web applications using pure JavaScript, esbuild, and modern web standards.",
      excerpt:
        "Discover the secrets to creating blazing-fast web applications.",
      author: "dunamismax",
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 86400000),
      tags: ["performance", "web-development", "javascript", "esbuild"],
    },
    {
      _id: new ObjectId(),
      title: "Web Components: The Future of UI Development",
      slug: "web-components-future-ui-development",
      content:
        "Explore how Web Components provide a framework-agnostic way to build reusable UI elements with native browser APIs.",
      excerpt:
        "Web Components offer a powerful way to create reusable UI elements.",
      author: "dunamismax",
      createdAt: new Date(Date.now() - 172800000),
      updatedAt: new Date(Date.now() - 172800000),
      tags: ["web-components", "ui", "javascript", "standards"],
    },
  ];

  const existingPosts = await posts.countDocuments();
  if (existingPosts === 0) {
    await posts.insertMany(samplePosts);
  }

  fastify.get("/posts", async (request, reply) => {
    try {
      const { page = 1, limit = 10 } = request.query;
      const skip = (page - 1) * limit;

      const postsList = await posts
        .find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray();

      const total = await posts.countDocuments();

      return {
        posts: postsList,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      reply.code(500).send({ error: "Failed to fetch posts" });
    }
  });

  fastify.get("/posts/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      let post;

      if (ObjectId.isValid(id)) {
        post = await posts.findOne({ _id: new ObjectId(id) });
      } else {
        post = await posts.findOne({ slug: id });
      }

      if (!post) {
        reply.code(404).send({ error: "Post not found" });
        return;
      }

      return { post };
    } catch (error) {
      reply.code(500).send({ error: "Failed to fetch post" });
    }
  });
}
