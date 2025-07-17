import { getDb } from './client.js';

export const postsCollection = async () => {
  const db = await getDb();
  return db.collection('posts');
};

export const usersCollection = async () => {
  const db = await getDb();
  return db.collection('users');
};