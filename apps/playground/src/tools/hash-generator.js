export class HashGenerator {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  render(container) {
    container.innerHTML = `
      <h2>Hash Generator</h2>
      <div class="tool-form">
        <div class="form-group">
          <label for="hash-text">Text to hash:</label>
          <textarea id="hash-text" rows="3" placeholder="Enter text to hash..."></textarea>
        </div>
        <div class="form-group">
          <label for="hash-algorithm">Hash algorithm:</label>
          <select id="hash-algorithm">
            <option value="md5">MD5</option>
            <option value="sha1">SHA-1</option>
            <option value="sha256" selected>SHA-256</option>
            <option value="sha512">SHA-512</option>
          </select>
        </div>
        <ui-button id="generate-hash-btn" variant="primary">Generate Hash</ui-button>
      </div>
      <div id="hash-result" class="result-container">
        <div class="result-content">Enter text to generate a hash</div>
      </div>
    `;

    const generateBtn = container.querySelector('#generate-hash-btn');
    const textInput = container.querySelector('#hash-text');
    const algorithmSelect = container.querySelector('#hash-algorithm');
    const resultContainer = container.querySelector('#hash-result');

    generateBtn.addEventListener('click', () => {
      if (textInput.value.trim()) {
        this.generateHash(textInput.value, algorithmSelect.value, resultContainer);
      }
    });
  }

  async generateHash(text, algorithm, resultContainer) {
    resultContainer.className = 'result-container loading';
    resultContainer.innerHTML = '<loading-spinner></loading-spinner>';

    try {
      const response = await this.apiClient.post('/tools/hash-text', { 
        text, 
        algorithm 
      });
      const { hash, algorithm: usedAlgorithm, originalText } = response;

      resultContainer.className = 'result-container success';
      resultContainer.innerHTML = `
        <div class="result-content">
          <div class="result-stats">
            <div class="stat-item">
              <div class="stat-value">${usedAlgorithm.toUpperCase()}</div>
              <div class="stat-label">Algorithm</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${hash.length}</div>
              <div class="stat-label">Hash Length</div>
            </div>
          </div>
          <div class="hash-result">${hash}</div>
          <div style="margin-bottom: 1rem;">
            <strong>Original text:</strong> ${originalText}
          </div>
          <button class="copy-button" onclick="navigator.clipboard.writeText('${hash}')">
            Copy Hash
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