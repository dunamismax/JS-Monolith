import { PostList } from './components/post-list.js';
import { PostDetail } from './components/post-detail.js';
import { AboutPage } from './components/about-page.js';

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
        <button class="back-button" onclick="history.back()">← Back to posts</button>
        <div id="post-container"></div>
      `;
      
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
    this.appContainer.innerHTML = `
      <div class="error-message">
        <h2>404 - Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <button onclick="window.location.hash = '/'">Go Home</button>
      </div>
    `;
  }

  showError(message) {
    this.appContainer.innerHTML = `
      <div class="error-message">
        <h2>Error</h2>
        <p>${message}</p>
        <button onclick="window.location.reload()">Retry</button>
      </div>
    `;
  }
}