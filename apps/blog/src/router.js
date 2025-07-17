export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.params = {};
    
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });
  }

  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  navigate(path, pushState = true) {
    if (pushState) {
      history.pushState(null, '', path);
    }
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    if (hash) {
      const route = hash.slice(1) || '/';
      this.executeRoute(route);
    } else {
      this.executeRoute(path);
    }
  }

  executeRoute(route) {
    this.currentRoute = route;
    this.params = {};

    if (route === '/' || route === '') {
      const handler = this.routes.get('/');
      if (handler) handler();
      return;
    }

    if (route === '/about') {
      const handler = this.routes.get('/about');
      if (handler) handler();
      return;
    }

    if (route.startsWith('/post/')) {
      const postId = route.split('/')[2];
      this.params.id = postId;
      const handler = this.routes.get('/post/:id');
      if (handler) handler(this.params);
      return;
    }

    const handler = this.routes.get('/404');
    if (handler) handler();
  }

  getParams() {
    return this.params;
  }
}