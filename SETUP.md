# Setup Guide

Complete guide to set up Finance Mentor AI on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended)

### Verify Installation

```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
git --version   # Should show git version
```

---

## Installation Steps

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/finance-mentor-ai.git

# OR using SSH
git clone git@github.com:yourusername/finance-mentor-ai.git

# Navigate to project directory
cd finance-mentor-ai
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Environment Setup (Optional)

If you need environment variables:

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your values
```

### 4. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` (or another port if 5173 is busy).

---

## Project Structure

```
finance-mentor-ai/
├── src/
│   ├── components/          # React components
│   │   ├── layout/         # Layout components
│   │   ├── Dashboard.tsx   # Dashboard page
│   │   ├── Wallet.tsx      # Wallet page
│   │   ├── Planning.tsx    # Planning page
│   │   ├── Analytics.tsx   # Analytics page
│   │   ├── TaxPlanner.tsx  # Tax planner
│   │   ├── CreditScore.tsx # Credit score
│   │   ├── EMICalculator.tsx # EMI calculator
│   │   └── ...             # Other components
│   ├── context/            # React Context
│   │   └── FinanceContext.tsx
│   ├── types.ts            # TypeScript types
│   ├── constants.ts        # Constants & mock data
│   ├── router.tsx          # Route configuration
│   ├── App.tsx             # Main app component
│   ├── Layout.tsx          # Layout wrapper
│   ├── index.css           # Global styles
│   └── index.tsx           # Entry point
├── public/                 # Static assets
├── .env.example           # Environment variables example
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
├── tailwind.config.js     # Tailwind config
└── README.md              # Documentation
```

---

## Available Scripts

### Development

```bash
npm run dev
```
Starts the development server with hot reload at `http://localhost:5173`

### Build

```bash
npm run build
```
Creates an optimized production build in the `dist/` folder

### Preview

```bash
npm run preview
```
Preview the production build locally

---

## Configuration

### Vite Configuration

Edit `vite.config.ts` to customize build settings:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/', // Change for GitHub Pages
  server: {
    port: 5173,
    open: true // Auto-open browser
  }
})
```

### Tailwind Configuration

Edit `tailwind.config.js` to customize theme:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        // Add custom colors
      }
    }
  }
}
```

### TypeScript Configuration

Edit `tsconfig.json` for TypeScript settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "strict": true
  }
}
```

---

## Customization

### Mock Data

Edit `src/constants.ts` to customize initial data:

```typescript
export const TRANSACTIONS: Transaction[] = [
  // Add your transactions
];

export const BUDGETS: Budget[] = [
  // Add your budgets
];
```

### Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  cyan: {
    300: '#22d3ee',
    400: '#06b6d4',
    500: '#0891b2'
  }
}
```

### Routes

Add new routes in `src/router.tsx`:

```typescript
{
  path: "/new-page",
  element: <NewPage />
}
```

---

## Troubleshooting

### Port Already in Use

If port 5173 is busy:

```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear cache
rm -rf node_modules/.vite

# Rebuild
npm run build
```

### TypeScript Errors

```bash
# Check TypeScript version
npm list typescript

# Reinstall TypeScript
npm install -D typescript@latest
```

---

## IDE Setup

### VS Code Extensions (Recommended)

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Vue Plugin (Volar)**
- **Prettier - Code formatter**
- **ESLint**

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## Browser Support

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

## Data Storage

The app uses browser localStorage to persist data:

- Transactions
- Budgets
- Savings Goals
- User preferences

### Clear Data

Open browser console and run:
```javascript
localStorage.clear()
```

---

## Next Steps

1. ✅ Complete setup
2. 📖 Read [README.md](README.md) for features
3. 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment
4. 🤝 Read [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

---

## Getting Help

- 📖 Check [README.md](README.md)
- 🐛 [Report bugs](https://github.com/yourusername/finance-mentor-ai/issues)
- 💬 [Ask questions](https://github.com/yourusername/finance-mentor-ai/discussions)

---

**Happy coding! 🎉**
