# Contributing to Finance Mentor AI

First off, thank you for considering contributing to Finance Mentor AI! It's people like you that make this project better.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other apps**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure your code follows the existing style
4. Make sure your code lints
5. Write a clear commit message

## Development Process

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/your-username/finance-mentor-ai.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Code Style

- Use TypeScript for all new files
- Follow the existing code structure
- Use functional components with hooks
- Keep components small and focused
- Add comments for complex logic
- Use meaningful variable names

### Component Structure

```typescript
import React, { useState } from 'react';
import { Icon } from 'lucide-react';

interface ComponentProps {
  // Props interface
}

export const Component: React.FC<ComponentProps> = ({ prop }) => {
  // State and hooks
  const [state, setState] = useState();

  // Event handlers
  const handleEvent = () => {
    // Logic
  };

  // Render
  return (
    <div className="glass-panel">
      {/* JSX */}
    </div>
  );
};
```

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests after the first line

Examples:
```
Add EMI calculator component
Fix transaction filter bug
Update README with new features
```

### Testing

Before submitting a PR:

1. Test all affected features manually
2. Check responsive design on mobile
3. Verify no console errors
4. Test in multiple browsers if possible

## Project Structure

```
src/
├── components/       # React components
├── context/         # Context providers
├── types.ts         # TypeScript types
├── constants.ts     # Constants and mock data
└── router.tsx       # Route configuration
```

## Adding New Features

1. **Create Component**: Add new component in `src/components/`
2. **Add Route**: Update `src/router.tsx` if needed
3. **Update Navigation**: Add to Header/MobileMenu if needed
4. **Add Types**: Update `src/types.ts` if needed
5. **Update Docs**: Update README.md and ALL_FEATURES.md

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
