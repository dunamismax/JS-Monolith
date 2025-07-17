export class QRCodeGenerator {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  render(container) {
    container.innerHTML = `
      <h2>QR Code Generator</h2>
      <div class="tool-form">
        <div class="form-group">
          <label for="qr-text">Text or URL:</label>
          <textarea id="qr-text" rows="3" placeholder="Enter text or URL to encode..."></textarea>
        </div>
        <div class="form-group">
          <label for="qr-size">Size:</label>
          <select id="qr-size">
            <option value="150">Small (150x150)</option>
            <option value="200" selected>Medium (200x200)</option>
            <option value="300">Large (300x300)</option>
            <option value="400">Extra Large (400x400)</option>
          </select>
        </div>
        <ui-button id="generate-qr-btn" variant="primary">Generate QR Code</ui-button>
      </div>
      <div id="qr-result" class="result-container">
        <div class="result-content">Enter text or URL to generate a QR code</div>
      </div>
    `;

    const generateBtn = container.querySelector('#generate-qr-btn');
    const textInput = container.querySelector('#qr-text');
    const sizeSelect = container.querySelector('#qr-size');
    const resultContainer = container.querySelector('#qr-result');

    generateBtn.addEventListener('click', () => {
      if (textInput.value.trim()) {
        this.generateQR(textInput.value, sizeSelect.value, resultContainer);
      }
    });
  }

  async generateQR(text, size, resultContainer) {
    resultContainer.className = 'result-container loading';
    resultContainer.innerHTML = '<loading-spinner></loading-spinner>';

    try {
      const response = await this.apiClient.post('/tools/qr-code', { 
        text, 
        size: parseInt(size) 
      });
      const { qrUrl, text: originalText } = response;

      resultContainer.className = 'result-container success';
      resultContainer.innerHTML = `
        <div class="result-content">
          <div class="qr-code-container">
            <img src="${qrUrl}" alt="QR Code" />
          </div>
          <div class="stat-item" style="margin: 0 auto; max-width: 300px;">
            <div class="stat-label">Encoded Text</div>
            <div style="font-size: 0.9rem; margin-top: 0.5rem; word-break: break-all;">
              ${originalText}
            </div>
          </div>
          <button class="copy-button" onclick="navigator.clipboard.writeText('${originalText}')">
            Copy Text
          </button>
        </div>
      `;
    } catch (error) {
      resultContainer.className = 'result-container error';
      resultContainer.innerHTML = `
        <div class="result-content">
          <strong>Error:</strong> ${error.message}
        </div>
      `;
    }
  }
}