import '@js-monolith/ui-components';
import { createApiClient } from '@js-monolith/lib';
import { PlaygroundApp } from './playground-app.js';

const API_BASE_URL = 'http://localhost:3001/api';

const apiClient = createApiClient(API_BASE_URL);
const app = new PlaygroundApp(apiClient);

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});