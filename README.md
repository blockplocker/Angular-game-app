# 🎨 Angular App by Noa

Welcome!  
👋 Hi, I'm **Noa**, and this is a showcase of what I've learned while building with Angular.

## 🌐 Live Demo

**[Try the live demo on GitHub Pages](https://blockplocker.github.io/Angular-game-app/)**

## 🌐 Live Demo

**[Try the live demo on GitHub Pages](https://blockplocker.github.io/Angular-game-app/)**

## 🚀 About the App

This Angular application is a collection of interactive demos and mini-projects that demonstrate key concepts and features of the Angular framework. Each section highlights different aspects of development, from UI components to API integration.

## 🚀 Quick Start

1. **Clone and install**
   ```bash
   git clone https://github.com/blockplocker/Angular-game-app.git
   cd Angular-game-app
   npm install
   ```

2. **Setup environment** 
   ```bash
   cp src/environments/environment.template.ts src/environments/environment.ts
   ```
   Edit `src/environments/environment.ts` and add your API keys

3. **Run the app**
   ```bash
   ng serve
   ```

4. **Optional: Calendar API**
   - Clone and run [Calendar API](https://github.com/blockplocker/calenderApi)
   - The app uses local storage fallback if the API isn't available

## 🚀 About the App

This Angular application is a collection of interactive demos and mini-projects that demonstrate key concepts and features of the Angular framework. Each section highlights different aspects of development, from UI components to API integration.

## 🛠️ What I've Learned in this Project

Throughout this project, I've gained hands-on experience with:

- **Component-based architecture**
- **Data binding & event handling**
- **Services & Dependency Injection**
- **Routing & navigation**
- **Directives & pipes**
- **SCSS styling & theming**
- **Working with APIs using NSwag**
- **Local storage CRUD operations**
- **Charting and data visualization**
- **Calendar and event management**
- **Finance tracking and category analysis**

## 🎮 Demos

Explore the different sections of the app:

### 🕹️ Games
A collection of fun and interactive games built with Angular. Great for showcasing dynamic UI and event handling.


### 💰 Finance
Track your personal finances by adding transactions, viewing your balance, and analyzing spending by category. Includes:

- Transaction input form
- Real-time balance updates
- Category-based spending breakdown
- Chart showing balance over time

### 📅 Calendar
Manage your schedule with a dynamic calendar interface. Features include:

- Create, reschedule, and delete events
- Dual CRUD support:
  - **API-based CRUD** via NSwag
  - **Local storage fallback** for offline use or when API access is unavailable

### 💬 Discussly Integration
Early-stage integration with the [Discussly](https://github.com/blockplocker/DiscusslyApi) forum API using NSwag. Backend connectivity is set up, but frontend implementation is still in progress.

### 🏠 Housing
Browse housing listings with detailed views, filters, and interactive features. Demonstrates routing, services, and API integration.

### ✅ Todos
A simple yet powerful todo app that fetches tasks from an API. Highlights CRUD operations and reactive forms.

## 🛠️ Environment Configuration

The application uses environment files to manage API endpoints and keys:

- `src/environments/environment.ts` - Development configuration
- `src/environments/environment.prod.ts` - Production configuration
- `src/environments/environment.template.ts` - Template for development setup
- `src/environments/environment.prod.template.ts` - Template for production setup

### Required API Keys
- **API Ninjas**: For Sudoku generation and geocoding services
- **OpenWeatherMap**: For weather data in the weather component

### Backend Services
- **Calendar API**: Handles calendar events with full CRUD operations
- **Discussly API**: Forum functionality (integration in progress)

