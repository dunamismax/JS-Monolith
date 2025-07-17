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

## About This Stack

This monorepo showcases The Ultimate Pure JavaScript Monorepo - architected for speed, simplicity, and maximum performance by leveraging vanilla JavaScript with zero framework overhead. It produces lightning-fast web applications with modern Web Components, high-performance backend services, and cross-platform mobile deployment capabilities with enterprise-grade security.

### Core Philosophy

- **Pure JavaScript First**: No frameworks, maximum performance, direct DOM control
- **Web Components**: Native browser APIs for reusable, framework-agnostic components
- **Lightning-Fast Builds**: esbuild for near-instantaneous compilation and bundling
- **Monorepo Architecture**: Turborepo with intelligent caching and parallel execution
- **Modern Backend**: Fastify for high-throughput API services with minimal overhead
- **Database Performance**: MongoDB native driver without ODM abstraction layer
- **Cross-Platform Mobile**: Capacitor integration for iOS and Android deployment
- **Enterprise Security**: XSS protection, CSP headers, input validation, and secure practices

## Tech Stack

| Layer                 | Technology                                                                        | Purpose                                     |
| --------------------- | --------------------------------------------------------------------------------- | ------------------------------------------- |
| **Frontend Language** | [Vanilla JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)     | Pure JS for maximum performance and control |
| **UI Components**     | [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components) | Native browser APIs for reusable components |
| **Build System**      | [esbuild](https://esbuild.github.io/)                                             | Lightning-fast builds and bundling          |
| **Backend Framework** | [Fastify](https://www.fastify.io/)                                                | High-performance Node.js web framework      |
| **Database**          | [MongoDB](https://www.mongodb.com/)                                               | Document database with native driver        |
| **Styling**           | [Pico.css](https://picocss.com/)                                                  | Minimalist CSS framework for semantic HTML  |
| **Monorepo Tool**     | [Turborepo](https://turbo.build/)                                                 | Intelligent caching and parallel execution  |
| **Package Manager**   | [pnpm](https://pnpm.io/)                                                          | Fast, disk space efficient package manager  |
| **Mobile Platform**   | [Capacitor](https://capacitorjs.com/)                                             | Cross-platform native mobile app wrapper    |

## Quick Start

### Prerequisites

- Node.js 18 or higher
- pnpm 9 or higher
- MongoDB (local or remote)
- For mobile development: Xcode (iOS) or Android Studio (Android)

### Installation

1. Clone and initialize:

   ```bash
   git clone https://github.com/dunamismax/js-monolith.git
   cd js-monolith
   pnpm install
   ```

2. Set up environment variables (optional):

   ```bash
   # Database Configuration
   export MONGODB_URI="mongodb://localhost:27017"
   export DB_NAME="js-monolith"
   
   # Frontend API Configuration (for production)
   export BLOG_API_URL="http://localhost:3001/api"
   export PLAYGROUND_API_URL="http://localhost:3001/api"
   
   # Security Configuration (for production)
   export NODE_ENV="production"
   export FRONTEND_URL="https://yourdomain.com"
   ```

3. Start the stack:

   ```bash
   pnpm dev
   # API Server: http://localhost:3001
   # Blog: http://localhost:3000
   # Playground: http://localhost:3002
   ```

## Applications

### Blog - dunamismax-blog (Port 3000)

Modern, dark-themed blog built with pure Vanilla JavaScript.

**Features:**

- Clean, responsive design with Pico.css dark theme
- Fast client-side routing with hash-based navigation
- Blog post listing with pagination support
- Individual post detail views with formatted content
- About page showcasing the tech stack
- Web Components for UI consistency
- **Mobile Ready**: iOS and Android app deployment via Capacitor
- **Secure**: XSS protection, CSP headers, and input sanitization

**Implementation:**

- Pure Vanilla JavaScript with zero framework overhead
- Web Components for reusable UI elements
- esbuild for lightning-fast builds and hot reload
- MongoDB integration for blog post storage
- Semantic HTML with Pico.css styling

### API Playground (Port 3002)

Interactive testing platform showcasing all API endpoints with beautiful UI.

**Features:**

- **Text Analyzer**: Word count, character count, reading time estimation
- **Random Number Generator**: Configurable ranges and multiple numbers
- **Dice Roller**: Support for d4, d6, d8, d10, d12, d20, d100 dice
- **Password Generator**: Cryptographically secure password generation
- **Color Palette Generator**: Random color schemes with hex codes
- **QR Code Generator**: Convert text/URLs to QR codes
- **Hash Generator**: SHA-256, SHA-512 secure hashing (deprecated algorithms removed)
- **Mobile Ready**: Native iOS and Android app capabilities
- **Secure**: Input validation, rate limiting, and XSS protection

**Implementation:**

- Vanilla JavaScript with Web Components
- Real-time API interactions with debounced inputs
- Responsive design with gradient backgrounds
- esbuild bundling for optimal performance
- Copy-to-clipboard functionality for results

### API Server (Port 3001)

High-performance Fastify backend serving both blog content and interactive tools.

**Features:**

- RESTful API endpoints for blog posts
- Interactive tool endpoints for playground
- MongoDB integration with sample data seeding
- **Security Hardened**: Environment-based CORS, input validation, MongoDB injection prevention
- Comprehensive error handling and structured logging
- **Secure Cryptography**: crypto.randomBytes() for secure random generation
- **Input Sanitization**: Size limits, type checking, and range validation

**Implementation:**

- Fastify framework for maximum throughput
- MongoDB native driver for database operations
- Modular route organization
- Input validation and sanitization
- Structured logging and error handling

## Development Commands

### Essential Commands

```bash
pnpm install        # Install all dependencies
pnpm dev           # Start all applications in development mode
pnpm build         # Build all applications for production
pnpm lint          # Run ESLint across all packages
pnpm clean         # Clean build artifacts
```

### Individual Applications

```bash
cd apps/api && pnpm dev        # Run API server only
cd apps/blog && pnpm dev       # Run blog only
cd apps/playground && pnpm dev # Run playground only
```

### Build Commands

```bash
pnpm build         # Build all applications
pnpm preview       # Preview production builds
```

### Mobile Development

```bash
# Blog App Mobile Commands
cd apps/blog
pnpm mobile:build  # Build and sync for mobile platforms
pnpm ios:dev       # Open iOS development environment (Xcode)
pnpm android:dev   # Open Android development environment (Android Studio)

# Playground App Mobile Commands  
cd apps/playground
pnpm mobile:build  # Build and sync for mobile platforms
pnpm ios:dev       # Open iOS development environment (Xcode)
pnpm android:dev   # Open Android development environment (Android Studio)

# Individual Capacitor Commands
pnpm cap:sync      # Sync web assets to native platforms
pnpm cap:copy      # Copy web assets only
pnpm cap:open ios  # Open Xcode
pnpm cap:open android  # Open Android Studio
```

### Development Tools

```bash
pnpm lint          # Lint all packages (ESLint with security rules)
pnpm format        # Format code with Prettier
pnpm typecheck     # Type checking (if applicable)
```

## Package Architecture

### Shared Packages (`packages/`)

**@js-monolith/database**

- MongoDB native driver client setup
- Collection utilities and connection management
- Database schema and indexing

**@js-monolith/lib**

- API client with timeout and error handling
- Date formatting and relative time utilities
- **Security utilities**: HTML sanitization, XSS protection, safe DOM manipulation
- Input validation and sanitization functions
- Performance utilities (debounce, throttle)
- **Tool utilities**: Safe stats grid creation, error handling helpers

**@js-monolith/ui-components**

- Loading spinner component
- Modal dialog component
- Card component for content display
- Button component with variants
- Toast notification system

**@js-monolith/eslint-config**

- Shared ESLint configuration for pure JavaScript
- Consistent code style across all packages
- Modern ES2021+ rule configurations

## Production Deployment

Each application builds to optimized bundles:

```bash
pnpm build          # Build all applications
pnpm preview        # Preview production builds
```

### Build Outputs

- **API**: No build needed (Node.js application)
- **Blog**: `public/js/bundle.js` - Minified application bundle (~16KB)
- **Playground**: `public/js/bundle.js` - Minified application bundle (~24KB)
- **Mobile Apps**: Native iOS/Android app packages via Capacitor

### Environment Variables

```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017
DB_NAME=js-monolith

# Application Ports
PORT=3001  # API server port

# Frontend API Configuration
BLOG_API_URL=http://localhost:3001/api          # Blog app API endpoint
PLAYGROUND_API_URL=http://localhost:3001/api    # Playground app API endpoint

# Production Security Configuration
NODE_ENV=production                             # Enables production security features
FRONTEND_URL=https://yourdomain.com            # Allowed CORS origins for production

# Mobile Development (handled by Capacitor)
# iOS/Android builds use bundled configurations
```

## Performance Benefits

- **Zero Framework Overhead**: Pure JavaScript eliminates framework bundle size (16-24KB total)
- **Lightning-Fast Builds**: esbuild compiles JavaScript at native speed (~10ms builds)
- **Minimal Dependencies**: Reduced attack surface and faster installs
- **Native Web Components**: Browser-native component system
- **Intelligent Caching**: Turborepo caches builds and operations
- **Database Performance**: MongoDB native driver without ODM overhead
- **Optimal Bundling**: Tree-shaking and minification for minimal payloads
- **Cross-Platform Efficiency**: Single codebase deploys to web, iOS, and Android

## Security Features

### Enterprise-Grade Security Implementation

- **XSS Protection**: Comprehensive HTML sanitization and safe DOM manipulation
- **Content Security Policy**: Strict CSP headers prevent code injection attacks
- **MongoDB Injection Prevention**: Parameterized queries and input validation
- **CORS Security**: Environment-based origin restrictions for production
- **Input Sanitization**: Size limits, type checking, and range validation
- **Secure Cryptography**: crypto.randomBytes() for password generation
- **Error Handling**: Structured logging without information disclosure
- **Environment Configuration**: Secure credential management via environment variables

### Security Compliance

- **OWASP Best Practices**: Follows web application security standards
- **Zero Trust Validation**: All user inputs validated and sanitized
- **Production Hardening**: Security features auto-enabled in production mode
- **Mobile Security**: Native app security via Capacitor's security model

## Cross-Platform Mobile Deployment

### Capacitor Integration

Both the Blog and Playground applications are fully configured for native mobile deployment using Capacitor, enabling you to deploy to iOS and Android app stores with a single JavaScript codebase.

### Mobile Features

- **Native App Shell**: Web applications wrapped in native mobile containers
- **Platform-Specific Configurations**: Optimized settings for iOS and Android
- **Splash Screens**: Custom branded splash screens for each platform
- **App Store Ready**: Configured for production app store deployment
- **Performance**: Native-level performance using WKWebView (iOS) and Chrome Custom Tabs (Android)

### Mobile Development Workflow

1. **Setup**: Install mobile development prerequisites (Xcode/Android Studio)
2. **Build**: Run `pnpm mobile:build` to prepare web assets
3. **Develop**: Use `pnpm ios:dev` or `pnpm android:dev` for platform-specific development
4. **Deploy**: Build and submit to app stores using native platform tools

### Mobile App Configurations

**Blog App** (`com.dunamismax.blog`):
- Dark theme optimized for mobile reading
- Offline-capable blog post viewing
- Native navigation and gesture support

**Playground App** (`com.dunamismax.playground`):
- Interactive API testing on mobile devices
- Touch-optimized tool interfaces
- Real-time mobile debugging capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `pnpm lint`
5. Format code: `pnpm format`
6. Submit a pull request

## Troubleshooting

### Common Issues

**Build Problems:**

```bash
pnpm clean
pnpm install
pnpm build
```

**Mobile Development Issues:**

```bash
# Rebuild mobile platforms
cd apps/blog && pnpm mobile:build
cd apps/playground && pnpm mobile:build

# Reset Capacitor platforms
cd apps/blog && pnpm exec cap sync
cd apps/playground && pnpm exec cap sync
```

**Development Issues:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

**Database Issues:**

```bash
# Check MongoDB connection
mongo mongodb://localhost:27017/js-monolith
# Reset database (removes all data)
mongo js-monolith --eval "db.dropDatabase()"
```

**Security Configuration:**

```bash
# Verify CSP headers are working
curl -I http://localhost:3000
curl -I http://localhost:3002

# Test API security in production
export NODE_ENV=production
export FRONTEND_URL=https://yourdomain.com
```

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
