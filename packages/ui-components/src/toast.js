export class Toast extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const type = this.getAttribute('type') || 'info';
    const message = this.getAttribute('message') || '';
    const duration = parseInt(this.getAttribute('duration')) || 5000;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          max-width: 400px;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.3s ease;
        }
        :host([visible]) {
          opacity: 1;
          transform: translateX(0);
        }
        .toast {
          padding: 1rem;
          border-radius: 4px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .toast.info {
          background: #17a2b8;
        }
        .toast.success {
          background: #28a745;
        }
        .toast.warning {
          background: #ffc107;
          color: #212529;
        }
        .toast.error {
          background: #dc3545;
        }
        .close-btn {
          background: none;
          border: none;
          color: inherit;
          font-size: 1.25rem;
          cursor: pointer;
          opacity: 0.7;
          margin-left: 1rem;
        }
        .close-btn:hover {
          opacity: 1;
        }
      </style>
      <div class="toast ${type}">
        <span class="message">${message}</span>
        <button class="close-btn" aria-label="Close">&times;</button>
      </div>
    `;
    
    if (duration > 0) {
      setTimeout(() => this.hide(), duration);
    }
  }

  setupEventListeners() {
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => this.hide());
  }

  show() {
    this.setAttribute('visible', '');
  }

  hide() {
    this.removeAttribute('visible');
    setTimeout(() => this.remove(), 300);
  }

  static show(message, type = 'info', duration = 5000) {
    const toast = document.createElement('toast-notification');
    toast.setAttribute('message', message);
    toast.setAttribute('type', type);
    toast.setAttribute('duration', duration);
    document.body.appendChild(toast);
    setTimeout(() => toast.show(), 100);
    return toast;
  }
}

customElements.define('toast-notification', Toast);