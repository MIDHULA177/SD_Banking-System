# SD Banking Application

A modern banking dashboard built with React and Vite. This project simulates a personal banking experience with account overview, recent transactions, cards, payments, and transfer actions in a polished UI.

## Overview

The application presents a mock banking interface for a user named Maya Chen, including:

- Total balance summary
- Recent activity and transaction tracking
- Cards section with debit card details
- Payments and transfer flow
- Searchable activity list
- Persistent demo data using localStorage

## Features

- Responsive dashboard layout
- Interactive navigation tabs
- Transfer modal with validation
- Transaction filtering and search
- Balance visibility toggle
- Demo-only notifications and actions
- Saved state across refreshes in the browser

## Tech Stack

- React
- Vite
- CSS
- JavaScript

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Run the app

```bash
npm run dev
```

Then open the local URL shown in the terminal, typically:

```bash
http://localhost:5173
```

### Production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
  App.jsx
  App.css
  index.css
  main.jsx
public/
index.html
package.json
vite.config.js
```

## Scripts

- `npm run dev` — starts the Vite development server
- `npm run build` — creates a production build
- `npm run preview` — previews the built app locally
- `npm run lint` — runs the project linter

## Notes

This is a demo banking application intended for UI/UX learning and frontend practice. It does not connect to a real banking backend or process real financial transactions.
