import { formatDate, getRelativeTime } from '@js-monolith/lib';

export class PostList {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async loadPosts() {
    const response = await this.apiClient.get('/posts');
    return response.posts;
  }

  render(container, posts) {
    container.innerHTML = posts.map(post => `
      <article class="post-card">
        <h2 class="post-title" onclick="window.location.hash = '/post/${post.slug}'">${post.title}</h2>
        <div class="post-meta">
          <span>By ${post.author}</span>
          <span>•</span>
          <span>${getRelativeTime(post.createdAt)}</span>
          <span>•</span>
          <span>${formatDate(post.createdAt)}</span>
        </div>
        <p class="post-excerpt">${post.excerpt}</p>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </article>
    `).join('');
  }
}