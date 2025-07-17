export class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }
        :host(:hover) {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        .card-header {
          padding: 1rem;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
        }
        .card-body {
          padding: 1rem;
        }
        .card-footer {
          padding: 1rem;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;
        }
        ::slotted([slot="header"]) {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 500;
        }
      </style>
      <div class="card-header">
        <slot name="header"></slot>
      </div>
      <div class="card-body">
        <slot></slot>
      </div>
      <div class="card-footer">
        <slot name="footer"></slot>
      </div>
    `;
  }
}

customElements.define('ui-card', Card);