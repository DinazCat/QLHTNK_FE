# QLHTNK_FE

This is the frontend application for the Dental Clinic Management project, built with React.js.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository
2. Navigate to the QLHTNK_FE directory:
   ```bash
   cd QLHTNK_FE
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
5. Configure your environment variables in the `.env` file

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Project Structure

```
QLHTNK_FE/
├── public/           # Public assets
├── src/             # Source code
│   ├── api/         # API integration
│   ├── components/  # Reusable components
│   ├── views/       # Page components
│   ├── App.js       # Main application component
│   └── index.js     # Application entry point
└── package.json     # Project dependencies and scripts
```

## Key Features

- React.js frontend framework
- Modern UI components with React Bootstrap
- API integration with Axios
- Responsive design

## Dependencies

Major dependencies include:
- React v17
- React Router DOM
- React Bootstrap
- Axios for API calls
- DevExtreme components
- React Icons
- React Markdown

## Development

1. Start the development server:
   ```bash
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser

The page will reload when you make changes.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request