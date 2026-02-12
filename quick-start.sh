#!/bin/bash

# Finance Mentor AI - Quick Start Script
# This script helps you get started quickly

echo "🚀 Finance Mentor AI - Quick Start"
echo "=================================="
echo ""

# Check Node.js
echo "📦 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check npm
echo "📦 Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📥 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ .env.local created (you can edit it later)"
    echo ""
fi

# Success message
echo "✨ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "   1. Run 'npm run dev' to start the development server"
echo "   2. Open http://localhost:5173 in your browser"
echo "   3. Start building amazing financial features!"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Project overview and features"
echo "   - SETUP.md - Detailed setup guide"
echo "   - DEPLOYMENT.md - Deployment instructions"
echo ""
echo "Happy coding! 🎉"
