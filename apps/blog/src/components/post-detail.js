import { formatDate, getRelativeTime, escapeHTML, createSafeElement } from '@js-monolith/lib';

export class PostDetail {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async loadPost(postId) {
    const response = await this.apiClient.get(`/posts/${postId}`);
    return response.post;
  }

  render(container, post) {
    container.innerHTML = '';
    
    const article = createSafeElement('article', '', { class: 'post-detail' });
    
    const header = createSafeElement('header');
    const title = createSafeElement('h1', escapeHTML(post.title));
    
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
    
    const tagsDiv = createSafeElement('div', '', { class: 'post-tags' });
    post.tags.forEach(tag => {
      const tagSpan = createSafeElement('span', escapeHTML(tag), { class: 'tag' });
      tagsDiv.appendChild(tagSpan);
    });
    
    header.appendChild(title);
    header.appendChild(metaDiv);
    header.appendChild(tagsDiv);
    
    const contentDiv = createSafeElement('div', '', { class: 'post-content' });
    this.formatContent(post.content, contentDiv);
    
    article.appendChild(header);
    article.appendChild(contentDiv);
    container.appendChild(article);
  }

  formatContent(content, container) {
    const paragraphs = content
      .split('\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0);
    
    paragraphs.forEach(paragraph => {
      const p = createSafeElement('p', escapeHTML(paragraph));
      container.appendChild(p);
    });
  }
}