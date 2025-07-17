import { TextAnalyzer } from './tools/text-analyzer.js';
import { RandomNumberGenerator } from './tools/random-number-generator.js';
import { DiceRoller } from './tools/dice-roller.js';
import { PasswordGenerator } from './tools/password-generator.js';
import { ColorPalette } from './tools/color-palette.js';
import { QRCodeGenerator } from './tools/qr-code-generator.js';
import { HashGenerator } from './tools/hash-generator.js';

export class PlaygroundApp {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.container = document.getElementById('tools-container');
    this.tools = [
      new TextAnalyzer(apiClient),
      new RandomNumberGenerator(apiClient),
      new DiceRoller(apiClient),
      new PasswordGenerator(apiClient),
      new ColorPalette(apiClient),
      new QRCodeGenerator(apiClient),
      new HashGenerator(apiClient)
    ];
  }

  init() {
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    
    this.tools.forEach(tool => {
      const toolElement = document.createElement('div');
      toolElement.className = 'tool-section';
      tool.render(toolElement);
      this.container.appendChild(toolElement);
    });
  }
}