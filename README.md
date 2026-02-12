# 💰 Finance Mentor AI

A comprehensive personal finance management application with AI-powered insights, built with React, TypeScript, and modern web technologies.

![Finance Mentor AI](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6.svg)

## ✨ Features

### 📊 Core Features
- **Dashboard** - Real-time financial overview with AI predictions
- **Wallet** - Transaction management with advanced filtering
- **Planning** - Budget creation and savings goals tracking
- **Analytics** - Visual spending trends and insights
- **AI Chat Assistant** - Get personalized financial advice

### 💳 Financial Tools
- **Investment Portfolio** - Track stocks, crypto, ETFs, and bonds
- **Net Worth Tracker** - Monitor assets vs liabilities
- **Debt Tracker** - Manage and pay off debts strategically
- **Bill Reminders** - Never miss a payment
- **Recurring Transactions** - Manage subscriptions

### 🧮 Calculators & Planners
- **Tax Planner** - Optimize tax savings (Indian tax system)
- **Credit Score Monitor** - Track and improve creditworthiness
- **EMI Calculator** - Calculate loan EMIs with amortization

### 🎨 Design Features
- Beautiful glassmorphism UI with translucent panels
- Blue gradient theme with floating 3D shapes
- Smooth animations and transitions
- Fully responsive design
- Dark mode optimized

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/finance-mentor-ai.git

# Navigate to project directory
cd finance-mentor-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## 📦 Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.3.1
- **Language:** TypeScript 5.6.2
- **Build Tool:** Vite 5.4.10
- **Routing:** React Router DOM 6.28.0
- **Charts:** Recharts 2.14.1
- **Styling:** Tailwind CSS 3.4.15
- **Icons:** Lucide React 0.454.0
- **State Management:** React Context API

## 📁 Project Structure

```
finance-mentor-ai/
├── src/
│   ├── components/          # React components
│   │   ├── layout/         # Layout components (Header, MobileMenu)
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── Wallet.tsx      # Transaction management
│   │   ├── Planning.tsx    # Budgets & goals
│   │   ├── Analytics.tsx   # Charts & insights
│   │   ├── TaxPlanner.tsx  # Tax planning tool
│   │   ├── CreditScore.tsx # Credit monitoring
│   │   ├── EMICalculator.tsx # Loan calculator
│   │   └── ...             # Other components
│   ├── context/            # React Context providers
│   ├── types.ts            # TypeScript type definitions
│   ├── constants.ts        # App constants & mock data
│   ├── router.tsx          # Route configuration
│   ├── App.tsx             # Main app component
│   ├── Layout.tsx          # App layout wrapper
│   ├── index.css           # Global styles
│   └── index.tsx           # App entry point
├── public/                 # Static assets
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
├── tailwind.config.js     # Tailwind config
└── README.md              # This file
```

## 🎯 Key Features Breakdown

### 250+ Features Including:

#### Transaction Management
- Add, search, and filter transactions
- Category-based organization
- Export to CSV
- Advanced filtering (date range, amount, categories)

#### Budget & Goals
- Create category-wise budgets
- Track spending vs budget
- Visual progress indicators
- Savings goals with milestones

#### Investment Tracking
- Multi-asset portfolio (Stocks, Crypto, ETFs, Bonds)
- Profit/loss calculation
- Portfolio distribution charts

#### Tax Planning (Indian System)
- FY 2025-26 tax calculations
- Old vs New regime comparison
- Section-wise deductions (80C, 80D, 80CCD, HRA)
- Real-time tax liability

#### Credit Score
- Score monitoring (300-900 range)
- Factor-wise breakdown
- Credit account tracking
- Improvement tips

#### EMI Calculator
- Multiple loan types (Home, Car, Personal, Education)
- Interactive sliders
- Amortization schedule
- Principal vs Interest breakdown

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  cyan: { 300: '#22d3ee', 400: '#06b6d4', 500: '#0891b2' },
  blue: { 500: '#3b82f6', 600: '#2563eb' }
}
```

### Mock Data
Update `src/constants.ts` to modify initial data:
- Transactions
- Budgets
- Savings Goals
- Chart Data

## 🔒 Security & Privacy

- All data stored locally in browser (localStorage)
- No external API calls for sensitive data
- No user data collection
- Client-side only application

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- UI inspiration from modern fintech apps

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ for better financial management**

⭐ Star this repo if you find it helpful!
