# FinanceCalculator

A professional, modern, and comprehensive suite of financial calculators built with React, Vite, and Tailwind CSS. This platform provides users with essential tools to plan for mortgages, investments, savings goals, retirements, and more.

## Features

- **Comprehensive Calculators:** Includes Mortgage, Compound Interest, Loan Repayment, Savings Goals, Retirement Planner, ROI, Tax Estimator, Investment Growth, and Break-Even Analysis.
- **Modern UI/UX:** Built with a sleek dark mode by default, glassmorphism effects, and highly responsive components.
- **Interactive Charts:** Visualizes data instantly using Recharts to provide clear, actionable insights over time.
- **Global Currency Support:** Fully customizable currency settings, including a "Custom" input for typing any currency symbol in the world.
- **AI Financial Assistant:** A built-in chatbot assistant (educational guidance) designed to help users navigate financial concepts and tools.
- **SEO Optimized:** Implements best practices for search engine optimization, including dynamic metadata and semantic HTML.
- **Fully Responsive:** Beautifully designed to work across all devices, from mobile phones to large desktop screens.

## Tech Stack

- **Frontend:** React 18, React Router v7
- **Styling:** Tailwind CSS v4, Lucide React (Icons), Radix UI (Primitives)
- **Build Tool:** Vite
- **Data Visualization:** Recharts
- **Deployment & Hosting:** Optimized for platforms like Vercel or Netlify

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine. We recommend using `npm` for package management.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sajjad-hassan834/calculator-app.git
   cd calculator-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To create an optimized production build:
```bash
npm run build
```

This will generate a `dist` folder containing the minified and optimized static assets, ready for deployment.

## Project Structure

- `src/components/` - Reusable UI components (layout, shared, specific tools)
- `src/hooks/` - Custom React hooks for local storage and calculator states
- `src/lib/` - Configuration files, formatters, and context providers
- `src/pages/` - Main route pages and dynamic calculator rendering
- `src/styles/` - Global CSS and Tailwind configurations
- `src/types/` - TypeScript interface definitions

## Support Us

If you find this tool helpful, consider supporting our mission to keep high-quality financial education free! You can find the **Support Us** button in the top right header of the application.

## License

This project is intended for educational purposes. All rights reserved.
