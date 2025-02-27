# Rick and Morty Explorer - Angular Application

## Prerequisites
- Node.js (v18 or later)
- Angular CLI v19+

## Installation

1. Clone or download:
```bash
git clone https://github.com/your-username/rick-morty-app.git
```

2. Navigate to the project directory:
```bash
cd rick-morty-app
```

3. Install Node modules:
```bash
npm install
```

4. Copy the provided files to their respective locations in the project structure:
├── app/
│   ├── components/
│   │   ├── character-card/
│   │   ├── footer/
│   │   ├── header/
│   │   └── loading-indicator/
│   ├── directives/
│   │   └── infinite-scroll.directive.ts
│   ├── models/
│   │   └── character.ts
│   ├── pages/
│   │   ├── character-detail-page/
│   │   └── home/
│   ├── pipes/
│   │   └── filter.pipe.ts
│   ├── services/
│   │   └── api.service.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
└── styles.scss
```

5. Make sure all required dependencies are installed:
```bash
ng serve
```

## Project Structure

- **components/**: Reusable UI components
  - **character-card/**: Card component for displaying character information
  - **footer/**: Application footer
  - **header/**: Application header
  - **loading-indicator/**: Loading spinner component
- **directives/**: Custom directives
  - **infinite-scroll.directive.ts**: Custom directive for infinite scrolling
- **models/**: Data models/interfaces
  - **character.ts**: Character and API response interfaces
- **pages/**: Page components
  - **character-detail-page/**: Character detail view
  - **home/**: Home page with character grid/list
- **pipes/**: Custom pipes
  - **filter.pipe.ts**: Pipe for filtering characters
- **services/**: API services
  - **api.service.ts**: Service for Rick and Morty API communication

## Features

- Responsive grid layout that adapts to screen size
- Toggle between grid and list views
- Infinite scrolling
- Filter by character name and status
- Detailed character page
- Mobile-first design approach

## API

This application uses the [Rick and Morty API](https://rickandmortyapi.com/).