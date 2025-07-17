export class RandomNumberGenerator {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  render(container) {
    container.innerHTML = `
      <h2>Random Number Generator</h2>
      <div class="tool-form">
        <div class="form-row">
          <div class="form-group">
            <label for="min-input">Minimum:</label>
            <input type="number" id="min-input" value="1" min="1">
          </div>
          <div class="form-group">
            <label for="max-input">Maximum:</label>
            <input type="number" id="max-input" value="100" min="1">
          </div>
        </div>
        <ui-button id="generate-btn" variant="primary">Generate Random Number</ui-button>
      </div>
      <div id="random-result" class="result-container">
        <div class="result-content">Click the button to generate a random number</div>
      </div>
    `;

    const generateBtn = container.querySelector('#generate-btn');
    const minInput = container.querySelector('#min-input');
    const maxInput = container.querySelector('#max-input');
    const resultContainer = container.querySelector('#random-result');

    generateBtn.addEventListener('click', () => {
      this.generateNumber(minInput.value, maxInput.value, resultContainer);
    });
  }

  async generateNumber(min, max, resultContainer) {
    resultContainer.className = 'result-container loading';
    resultContainer.innerHTML = '<loading-spinner></loading-spinner>';

    try {
      const response = await this.apiClient.get(`/tools/random-number?min=${min}&max=${max}`);
      const { number, min: minVal, max: maxVal } = response;

      resultContainer.className = 'result-container success';
      resultContainer.innerHTML = `
        <div class="result-content">
          <div class="stat-item" style="margin: 0 auto; max-width: 200px;">
            <div class="stat-value" style="font-size: 3rem;">${number}</div>
            <div class="stat-label">Random number between ${minVal} and ${maxVal}</div>
          </div>
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