import { formatDate, getRelativeTime, escapeHTML, createSafeElement } from '@js-monolith/lib';

export class PostList {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async loadPosts() {
    const response = await this.apiClient.get('/posts');
    return response.posts;
  }

  render(container, posts) {
    container.innerHTML = '';
    
    posts.forEach(post => {
      const article = createSafeElement('article', '', { class: 'post-card' });
      
      const title = createSafeElement('h2', escapeHTML(post.title), { class: 'post-title' });
      title.style.cursor = 'pointer';
      title.addEventListener('click', () => {
        window.location.hash = `/post/${escapeHTML(post.slug)}`;
      });
      
      const metaDiv = createSafeElement('div', '', { class: 'post-meta' });
      const authorSpan = createSafeElement('span', `By ${escapeHTML(post.author)}`);
      const separator1 = createSafeElement('span', '•');
      const timeSpan = createSafeElement('span', getRelativeTime(post.createdAt));
      const separator2 = createSafeElement('span', '•');
      const dateSpan = createSafeElement('span', formatDate(post.createdAt));
      
      metaDiv.appendChild(authorSpan);
      metaDiv.appendChild(separator1);
      metaDiv.appendChild(timeSpan);
      metaDiv.appendChild(separator2);
      metaDiv.appendChild(dateSpan);
      
      const excerpt = createSafeElement('p', escapeHTML(post.excerpt), { class: 'post-excerpt' });
      
      const tagsDiv = createSafeElement('div', '', { class: 'post-tags' });
      post.tags.forEach(tag => {
        const tagSpan = createSafeElement('span', escapeHTML(tag), { class: 'tag' });
        tagsDiv.appendChild(tagSpan);
      });
      
      article.appendChild(title);
      article.appendChild(metaDiv);
      article.appendChild(excerpt);
      article.appendChild(tagsDiv);
      container.appendChild(article);
    });
  }
}