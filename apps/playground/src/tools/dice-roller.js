export class DiceRoller {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  render(container) {
    container.innerHTML = `
      <h2>Dice Roller</h2>
      <div class="tool-form">
        <div class="form-row">
          <div class="form-group">
            <label for="dice-sides">Number of sides:</label>
            <select id="dice-sides">
              <option value="4">d4</option>
              <option value="6" selected>d6</option>
              <option value="8">d8</option>
              <option value="10">d10</option>
              <option value="12">d12</option>
              <option value="20">d20</option>
              <option value="100">d100</option>
            </select>
          </div>
          <div class="form-group">
            <label for="dice-count">Number of dice:</label>
            <input type="number" id="dice-count" value="1" min="1" max="10">
          </div>
        </div>
        <ui-button id="roll-btn" variant="primary">Roll Dice</ui-button>
      </div>
      <div id="dice-result" class="result-container">
        <div class="result-content">Click the button to roll the dice</div>
      </div>
    `;

    const rollBtn = container.querySelector('#roll-btn');
    const sidesSelect = container.querySelector('#dice-sides');
    const countInput = container.querySelector('#dice-count');
    const resultContainer = container.querySelector('#dice-result');

    rollBtn.addEventListener('click', () => {
      this.rollDice(sidesSelect.value, countInput.value, resultContainer);
    });
  }

  async rollDice(sides, count, resultContainer) {
    resultContainer.className = 'result-container loading';
    resultContainer.innerHTML = '<loading-spinner></loading-spinner>';

    try {
      const response = await this.apiClient.post('/tools/roll-dice', { 
        sides: parseInt(sides), 
        count: parseInt(count) 
      });
      const { rolls, total, sides: diceSides } = response;

      resultContainer.className = 'result-container success';
      resultContainer.innerHTML = `
        <div class="result-content">
          <div class="dice-result">
            ${rolls.map(roll => `<div class="dice-roll">${roll}</div>`).join('')}
          </div>
          <div class="stat-item" style="margin: 0 auto; max-width: 200px;">
            <div class="stat-value">${total}</div>
            <div class="stat-label">Total (${rolls.length}d${diceSides})</div>
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