import { formatDate, getRelativeTime } from '@js-monolith/lib';

export class PostDetail {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async loadPost(postId) {
    const response = await this.apiClient.get(`/posts/${postId}`);
    return response.post;
  }

  render(container, post) {
    container.innerHTML = `
      <article class="post-detail">
        <header>
          <h1>${post.title}</h1>
          <div class="post-meta">
            <span>By ${post.author}</span>
            <span>•</span>
            <span>${getRelativeTime(post.createdAt)}</span>
            <span>•</span>
            <span>${formatDate(post.createdAt)}</span>
          </div>
          <div class="post-tags">
            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </header>
        <div class="post-content">
          ${this.formatContent(post.content)}
        </div>
      </article>
    `;
  }

  formatContent(content) {
    return content
      .split('\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0)
      .map(paragraph => `<p>${paragraph}</p>`)
      .join('');
  }
}