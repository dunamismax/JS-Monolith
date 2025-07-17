export class AboutPage {
  render(container) {
    container.innerHTML = `
      <div class="about-content">
        <h1>About dunamismax</h1>
        <p>
          Welcome to my blog! I'm a passionate developer focused on building high-performance 
          web applications using modern JavaScript technologies. This blog is built with a 
          custom monorepo architecture that prioritizes speed, maintainability, and developer experience.
        </p>
        <p>
          I believe in the power of pure JavaScript and native web technologies. By avoiding 
          heavy frameworks and embracing modern web standards, we can create applications that 
          are both lightning-fast and future-proof.
        </p>
        <p>
          This blog serves as a showcase for the js-monolith architecture and a platform to 
          share insights about web development, performance optimization, and modern JavaScript techniques.
        </p>
        
        <h2>Tech Stack</h2>
        <div class="tech-stack">
          <div class="tech-item">
            <h3>Frontend</h3>
            <p>Pure Vanilla JavaScript with Web Components for maximum performance and control.</p>
          </div>
          <div class="tech-item">
            <h3>Backend</h3>
            <p>Fastify on Node.js for ultra-fast API responses and excellent developer experience.</p>
          </div>
          <div class="tech-item">
            <h3>Database</h3>
            <p>MongoDB with native driver for flexible, document-based data storage.</p>
          </div>
          <div class="tech-item">
            <h3>Build System</h3>
            <p>esbuild for lightning-fast builds and Turborepo for intelligent caching.</p>
          </div>
          <div class="tech-item">
            <h3>Styling</h3>
            <p>Pico.css for beautiful, semantic HTML styling with custom dark theme.</p>
          </div>
          <div class="tech-item">
            <h3>Testing</h3>
            <p>Playwright for reliable, cross-browser end-to-end testing.</p>
          </div>
        </div>
        
        <h2>Get In Touch</h2>
        <p>
          Feel free to reach out if you have questions about the technologies used here or 
          want to discuss web development and performance optimization.
        </p>
        <p>
          You can find the source code for this blog and the entire js-monolith architecture 
          on <a href="https://github.com/dunamismax/js-monolith" target="_blank">GitHub</a>.
        </p>
      </div>
    `;
  }
}
