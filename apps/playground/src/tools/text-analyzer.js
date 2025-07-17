import { debounce } from "@js-monolith/lib";

export class TextAnalyzer {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.debouncedAnalyze = debounce(this.analyze.bind(this), 500);
  }

  render(container) {
    container.innerHTML = `
      <h2>Text Analyzer</h2>
      <div class="tool-form">
        <div class="form-group">
          <label for="text-input">Enter text to analyze:</label>
          <textarea id="text-input" rows="5" placeholder="Type or paste your text here..."></textarea>
        </div>
        <ui-button id="analyze-btn" variant="primary">Analyze Text</ui-button>
      </div>
      <div id="text-result" class="result-container">
        <div class="result-content">Enter some text to see the analysis</div>
      </div>
    `;

    const textInput = container.querySelector("#text-input");
    const analyzeBtn = container.querySelector("#analyze-btn");
    const resultContainer = container.querySelector("#text-result");

    textInput.addEventListener("input", () => {
      if (textInput.value.trim()) {
        this.debouncedAnalyze(textInput.value, resultContainer);
      }
    });

    analyzeBtn.addEventListener("click", () => {
      if (textInput.value.trim()) {
        this.analyze(textInput.value, resultContainer);
      }
    });
  }

  async analyze(text, resultContainer) {
    resultContainer.className = "result-container loading";
    resultContainer.innerHTML = "<loading-spinner></loading-spinner>";

    try {
      const response = await this.apiClient.post("/tools/analyze-text", {
        text,
      });
      const { analysis } = response;

      resultContainer.className = "result-container success";
      resultContainer.innerHTML = `
        <div class="result-content">
          <div class="result-stats">
            <div class="stat-item">
              <div class="stat-value">${analysis.words}</div>
              <div class="stat-label">Words</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${analysis.characters}</div>
              <div class="stat-label">Characters</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${analysis.charactersNoSpaces}</div>
              <div class="stat-label">No Spaces</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${analysis.sentences}</div>
              <div class="stat-label">Sentences</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${analysis.paragraphs}</div>
              <div class="stat-label">Paragraphs</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${analysis.readingTime}</div>
              <div class="stat-label">Reading Time</div>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      resultContainer.className = "result-container error";
      resultContainer.innerHTML = `
        <div class="result-content">
          <strong>Error:</strong> ${error.message}
        </div>
      `;
    }
  }
}
