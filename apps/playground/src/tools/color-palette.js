export class ColorPalette {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  render(container) {
    container.innerHTML = `
      <h2>Color Palette Generator</h2>
      <div class="tool-form">
        <div class="form-row">
          <div class="form-group">
            <label for="base-color">Base color (optional):</label>
            <input type="color" id="base-color" value="#007bff">
          </div>
          <div class="form-group">
            <label for="color-count">Number of colors:</label>
            <input type="number" id="color-count" value="5" min="2" max="10">
          </div>
        </div>
        <ui-button id="generate-palette-btn" variant="primary">Generate Palette</ui-button>
      </div>
      <div id="palette-result" class="result-container">
        <div class="result-content">Click the button to generate a color palette</div>
      </div>
    `;

    const generateBtn = container.querySelector('#generate-palette-btn');
    const baseColorInput = container.querySelector('#base-color');
    const countInput = container.querySelector('#color-count');
    const resultContainer = container.querySelector('#palette-result');

    generateBtn.addEventListener('click', () => {
      this.generatePalette(baseColorInput.value, countInput.value, resultContainer);
    });
  }

  async generatePalette(baseColor, count, resultContainer) {
    resultContainer.className = 'result-container loading';
    resultContainer.innerHTML = '<loading-spinner></loading-spinner>';

    try {
      const response = await this.apiClient.post('/tools/color-palette', { 
        baseColor, 
        count: parseInt(count) 
      });
      const { colors } = response;

      resultContainer.className = 'result-container success';
      resultContainer.innerHTML = `
        <div class="result-content">
          <div class="color-palette">
            ${colors.map(color => `
              <div class="color-swatch" style="background-color: ${color}" onclick="navigator.clipboard.writeText('${color}')">
                <div class="color-code">${color}</div>
              </div>
            `).join('')}
          </div>
          <p style="margin-top: 1rem; color: #6c757d; font-size: 0.9rem;">
            Click on any color to copy it to your clipboard
          </p>
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