<p align="center">
  <img src="/images/js-evolution.jpeg" alt="js-monolith Logo" width="400" />
</p>

<p align="center">
  <a href="https://github.com/dunamismax/js-monolith">
    <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=24&pause=1000&color=F7DF1E&center=true&vCenter=true&width=800&lines=The+Ultimate+Pure+JavaScript+Monorepo;Vanilla+JS+%2B+Web+Components+%2B+Fastify;Lightning-Fast+esbuild+%2B+MongoDB;Cross-Platform+Mobile+Ready+with+Capacitor;Enterprise+Security+%2B+Zero+Framework+Overhead" alt="Typing SVG" />
  </a>
</p>

<p align="center">
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18+-339933.svg?logo=node.js" alt="Node.js Version"></a>
  <a href="https://www.fastify.io/"><img src="https://img.shields.io/badge/Fastify-4.0+-000000.svg?logo=fastify" alt="Fastify Version"></a>
  <a href="https://esbuild.github.io/"><img src="https://img.shields.io/badge/esbuild-0.20+-FFCF00.svg?logo=esbuild" alt="esbuild Version"></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-6.0+-47A248.svg?logo=mongodb" alt="MongoDB Version"></a>
  <a href="https://turbo.build/"><img src="https://img.shields.io/badge/Turborepo-2.0+-EF4444.svg?logo=turborepo" alt="Turborepo Version"></a>
  <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-9.0+-F69220.svg?logo=pnpm" alt="pnpm Version"></a>
  <a href="https://capacitorjs.com/"><img src="https://img.shields.io/badge/Capacitor-7.0+-119EFF.svg?logo=capacitor" alt="Capacitor Version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License"></a>
</p>

---

## The Ultimate Pure JavaScript Monorepo

High-performance web applications with Vanilla JS, Web Components, and enterprise security. Zero framework overhead.

### Tech Stack

- **Frontend**: Vanilla JS + Web Components + Pico.css
- **Backend**: Fastify + MongoDB native driver
- **Build**: esbuild + Turborepo for intelligent caching
- **Mobile**: Capacitor for iOS/Android deployment
- **Security**: XSS protection, CSP headers, input validation

## Quick Start

```bash
git clone https://github.com/dunamismax/js-monolith.git
cd js-monolith
pnpm install && pnpm dev
```

**Endpoints:**

- API Server: <http://localhost:3001>
- Blog: <http://localhost:3000>
- Playground: <http://localhost:3002>

## Applications

### 1. Blog (Port 3000)

Dark-themed blog with client-side routing, Web Components, and mobile deployment

### 2. API Playground (Port 3002)

Interactive tool platform featuring:

- Text Analyzer, Password Generator, QR Code Generator
- Dice Roller, Color Palette Generator, Hash Generator
- Real-time API testing with responsive UI

### 3. API Server (Port 3001)

High-performance Fastify backend with MongoDB integration and security hardening

## Development Commands

```bash
pnpm dev           # Start all applications
pnpm build         # Build for production
pnpm lint          # ESLint with security rules
pnpm clean         # Clean build artifacts
```

### Individual Apps

```bash
cd apps/api && pnpm dev          # API only
cd apps/blog && pnpm dev         # Blog only
cd apps/playground && pnpm dev   # Playground only
```

## Mobile Deployment

```bash
# Blog mobile app
cd apps/blog
pnpm mobile:build && pnpm ios:dev    # iOS development
pnpm mobile:build && pnpm android:dev # Android development

# Playground mobile app
cd apps/playground
pnpm mobile:build && pnpm ios:dev    # iOS development
pnpm mobile:build && pnpm android:dev # Android development
```

## Architecture

- **Shared Packages**: Database client, security utilities, UI components, ESLint config
- **Zero Framework Overhead**: Pure JS with ~16-24KB total bundle sizes
- **Enterprise Security**: OWASP compliance, XSS protection, input sanitization
- **Cross-Platform**: Single codebase → Web + iOS + Android apps

## Performance Benefits

- **Lightning builds**: esbuild compiles in ~10ms
- **Minimal bundles**: 16-24KB total application size
- **Native components**: Browser-native Web Components
- **Intelligent caching**: Turborepo optimization

## Contributing

Fork → Feature branch → Lint/Format → Pull request

## Support This Project

If you find this Ultimate Pure JavaScript Monorepo valuable, consider supporting its development:

<p align="center">
  <a href="https://www.buymeacoffee.com/dunamismax" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" />
  </a>
</p>

## Connect

<p align="center">
  <a href="https://twitter.com/dunamismax" target="_blank"><img src="https://img.shields.io/badge/Twitter-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter"></a>
  <a href="https://bsky.app/profile/dunamismax.bsky.social" target="_blank"><img src="https://img.shields.io/badge/Bluesky-blue?style=for-the-badge&logo=bluesky&logoColor=white" alt="Bluesky"></a>
  <a href="https://reddit.com/user/dunamismax" target="_blank"><img src="https://img.shields.io/badge/Reddit-%23FF4500.svg?&style=for-the-badge&logo=reddit&logoColor=white" alt="Reddit"></a>
  <a href="https://discord.com/users/dunamismax" target="_blank"><img src="https://img.shields.io/badge/Discord-dunamismax-7289DA.svg?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://signal.me/#p/+dunamismax.66" target="_blank"><img src="https://img.shields.io/badge/Signal-dunamismax.66-3A76F0.svg?style=for-the-badge&logo=signal&logoColor=white" alt="Signal"></a>
</p>

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <img src="/images/js-yellow-crown.jpg" alt="JavaScript Yellow" width="400" />
</p>

<p align="center">
  <strong>The Ultimate Pure JavaScript Monorepo</strong><br>
  <sub>Vanilla JS + Web Components + Fastify + MongoDB + esbuild + Turborepo + Capacitor</sub><br>
  <sub>Enterprise Security + Cross-Platform Mobile + Zero Framework Overhead</sub>
</p>
