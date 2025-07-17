export class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'medium';
    const disabled = this.hasAttribute('disabled');
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn.primary {
          background: #007bff;
          color: white;
        }
        .btn.primary:hover:not(:disabled) {
          background: #0056b3;
        }
        .btn.secondary {
          background: #6c757d;
          color: white;
        }
        .btn.secondary:hover:not(:disabled) {
          background: #545b62;
        }
        .btn.danger {
          background: #dc3545;
          color: white;
        }
        .btn.danger:hover:not(:disabled) {
          background: #c82333;
        }
        .btn.small {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        }
        .btn.large {
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
        }
      </style>
      <button class="btn ${variant} ${size}" ${disabled ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;
  }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('click', { detail: e }));
    });
  }
}

customElements.define('ui-button', Button);