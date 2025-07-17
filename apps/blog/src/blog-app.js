import { PostList } from './components/post-list.js';
import { PostDetail } from './components/post-detail.js';
import { AboutPage } from './components/about-page.js';
import { escapeHTML, createSafeElement } from '@js-monolith/lib';

export class BlogApp {
  constructor(apiClient, router) {
    this.apiClient = apiClient;
    this.router = router;
    this.appContainer = document.getElementById('app');
    this.postList = new PostList(apiClient);
    this.postDetail = new PostDetail(apiClient);
    this.aboutPage = new AboutPage();
    
    this.setupRoutes();
    this.setupNavigation();
  }

  init() {
    this.router.handleRoute();
  }

  setupRoutes() {
    this.router.addRoute('/', () => this.showHome());
    this.router.addRoute('/about', () => this.showAbout());
    this.router.addRoute('/post/:id', (params) => this.showPost(params.id));
    this.router.addRoute('/404', () => this.showNotFound());
  }

  setupNavigation() {
    const homeLink = document.getElementById('home-link');
    const aboutLink = document.getElementById('about-link');

    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.router.navigate('#/');
    });

    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.router.navigate('#/about');
    });
  }

  async showHome() {
    this.appContainer.innerHTML = '<loading-spinner></loading-spinner>';
    
    try {
      const posts = await this.postList.loadPosts();
      this.appContainer.innerHTML = `
        <header>
          <h1>Latest Posts</h1>
        </header>
        <div id="posts-container"></div>
      `;
      
      const postsContainer = document.getElementById('posts-container');
      this.postList.render(postsContainer, posts);
    } catch (error) {
      this.showError('Failed to load posts');
    }
  }

  async showPost(postId) {
    this.appContainer.innerHTML = '<loading-spinner></loading-spinner>';
    
    try {
      const post = await this.postDetail.loadPost(postId);
      this.appContainer.innerHTML = `
        <div id="post-container"></div>
      `;
      
      const backButton = createSafeElement('button', '← Back to posts', { class: 'back-button' });
      backButton.addEventListener('click', () => history.back());
      this.appContainer.insertBefore(backButton, this.appContainer.firstChild);
      
      const postContainer = document.getElementById('post-container');
      this.postDetail.render(postContainer, post);
    } catch (error) {
      this.showError('Failed to load post');
    }
  }

  showAbout() {
    this.appContainer.innerHTML = '';
    this.aboutPage.render(this.appContainer);
  }

  showNotFound() {
    this.appContainer.innerHTML = '';
    
    const errorDiv = createSafeElement('div', '', { class: 'error-message' });
    const heading = createSafeElement('h2', '404 - Page Not Found');
    const paragraph = createSafeElement('p', 'The page you\'re looking for doesn\'t exist.');
    const button = createSafeElement('button', 'Go Home');
    
    button.addEventListener('click', () => {
      window.location.hash = '/';
    });
    
    errorDiv.appendChild(heading);
    errorDiv.appendChild(paragraph);
    errorDiv.appendChild(button);
    this.appContainer.appendChild(errorDiv);
  }

  showError(message) {
    this.appContainer.innerHTML = '';
    
    const errorDiv = createSafeElement('div', '', { class: 'error-message' });
    const heading = createSafeElement('h2', 'Error');
    const paragraph = createSafeElement('p', escapeHTML(message));
    const button = createSafeElement('button', 'Retry');
    
    button.addEventListener('click', () => {
      window.location.reload();
    });
    
    errorDiv.appendChild(heading);
    errorDiv.appendChild(paragraph);
    errorDiv.appendChild(button);
    this.appContainer.appendChild(errorDiv);
  }
}