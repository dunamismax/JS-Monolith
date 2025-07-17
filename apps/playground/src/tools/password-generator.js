export class PasswordGenerator {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  render(container) {
    container.innerHTML = `
      <h2>Password Generator</h2>
      <div class="tool-form">
        <div class="form-group">
          <label for="password-length">Password length:</label>
          <input type="range" id="password-length" min="4" max="64" value="12">
          <span id="length-display">12</span>
        </div>
        <div class="checkbox-group">
          <div class="checkbox-item">
            <input type="checkbox" id="include-uppercase" checked>
            <label for="include-uppercase">Include uppercase letters</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="include-numbers" checked>
            <label for="include-numbers">Include numbers</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="include-symbols" checked>
            <label for="include-symbols">Include symbols</label>
          </div>
        </div>
        <ui-button id="generate-password-btn" variant="primary">Generate Password</ui-button>
      </div>
      <div id="password-result" class="result-container">
        <div class="result-content">Click the button to generate a password</div>
      </div>
    `;

    const generateBtn = container.querySelector('#generate-password-btn');
    const lengthSlider = container.querySelector('#password-length');
    const lengthDisplay = container.querySelector('#length-display');
    const uppercaseCheck = container.querySelector('#include-uppercase');
    const numbersCheck = container.querySelector('#include-numbers');
    const symbolsCheck = container.querySelector('#include-symbols');
    const resultContainer = container.querySelector('#password-result');

    lengthSlider.addEventListener('input', () => {
      lengthDisplay.textContent = lengthSlider.value;
    });

    generateBtn.addEventListener('click', () => {
      this.generatePassword({
        length: parseInt(lengthSlider.value),
        includeUppercase: uppercaseCheck.checked,
        includeNumbers: numbersCheck.checked,
        includeSymbols: symbolsCheck.checked
      }, resultContainer);
    });
  }

  async generatePassword(options, resultContainer) {
    resultContainer.className = 'result-container loading';
    resultContainer.innerHTML = '<loading-spinner></loading-spinner>';

    try {
      const response = await this.apiClient.post('/tools/generate-password', options);
      const { password, length, strength } = response;

      const strengthColor = {
        weak: '#dc3545',
        medium: '#ffc107',
        strong: '#28a745'
      };

      resultContainer.className = 'result-container success';
      resultContainer.innerHTML = `
        <div class="result-content">
          <div class="password-display">${password}</div>
          <div class="result-stats">
            <div class="stat-item">
              <div class="stat-value">${length}</div>
              <div class="stat-label">Characters</div>
            </div>
            <div class="stat-item">
              <div class="stat-value" style="color: ${strengthColor[strength]}">${strength.toUpperCase()}</div>
              <div class="stat-label">Strength</div>
            </div>
          </div>
          <button class="copy-button" onclick="navigator.clipboard.writeText('${password}')">
            Copy Password
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