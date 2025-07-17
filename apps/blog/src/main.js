import '@js-monolith/ui-components';
import { createApiClient } from '@js-monolith/lib';
import { Router } from './router.js';
import { BlogApp } from './blog-app.js';

const API_BASE_URL = 'http://localhost:3001/api';

const apiClient = createApiClient(API_BASE_URL);
const router = new Router();
const app = new BlogApp(apiClient, router);

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});