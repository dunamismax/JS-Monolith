export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

export const sanitizeHTML = (html) => {
  if (typeof html !== 'string') return '';
  
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

export const escapeHTML = (text) => {
  if (typeof text !== 'string') return '';
  
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
};

export const createSafeElement = (tagName, textContent, attributes = {}) => {
  const element = document.createElement(tagName);
  if (textContent) {
    element.textContent = textContent;
  }
  Object.entries(attributes).forEach(([key, value]) => {
    if (key.startsWith('on')) return; // Prevent event handler injection
    element.setAttribute(key, sanitizeInput(value));
  });
  return element;
};

export const createStatsGrid = (stats) => {
  const container = createSafeElement('div', '', { class: 'result-stats' });
  
  Object.entries(stats).forEach(([label, value]) => {
    const statItem = createSafeElement('div', '', { class: 'stat-item' });
    const statValue = createSafeElement('div', escapeHTML(String(value)), { class: 'stat-value' });
    const statLabel = createSafeElement('div', escapeHTML(label), { class: 'stat-label' });
    
    statItem.appendChild(statValue);
    statItem.appendChild(statLabel);
    container.appendChild(statItem);
  });
  
  return container;
};

export const showToolResult = (container, content, status = 'success') => {
  container.className = `result-container ${status}`;
  container.innerHTML = '';
  
  const resultContent = createSafeElement('div', '', { class: 'result-content' });
  
  if (typeof content === 'string') {
    resultContent.textContent = content;
  } else if (content instanceof HTMLElement) {
    resultContent.appendChild(content);
  }
  
  container.appendChild(resultContent);
};

export const showToolError = (container, errorMessage) => {
  container.className = 'result-container error';
  container.innerHTML = '';
  
  const resultContent = createSafeElement('div', '', { class: 'result-content' });
  const errorStrong = createSafeElement('strong', 'Error: ');
  const errorText = createSafeElement('span', escapeHTML(errorMessage));
  
  resultContent.appendChild(errorStrong);
  resultContent.appendChild(errorText);
  container.appendChild(resultContent);
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== '';
};

export const validateLength = (value, min = 0, max = Infinity) => {
  if (typeof value !== 'string') return false;
  return value.length >= min && value.length <= max;
};