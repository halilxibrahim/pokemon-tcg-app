# Pokémon TCG App Case for Byterise Company
<img width="1470" alt="Image" src="https://github.com/user-attachments/assets/838bcb35-42f1-4f1d-8453-a798ca7d5fe9" />

A React Native mobile application that showcases Pokémon Trading Card Game (TCG) cards using the public Pokémon TCG API.
## 📱 App Overview

This application was built as part of a mobile app coding challenge. It allows users to browse Pokémon cards, view detailed information about each card, and save their favorite cards locally on their device.

App Overview Video:
https://youtu.be/v7uT5i-0cFA


### Key Features:

- **Pokémon Cards List Screen**:
  - Displays a paginated list of Pokémon cards
  - Shows card images and names
  - Implements infinite scrolling to load 10 cards per page

- **Pokémon Card Detail Screen**:
  - Shows comprehensive information about a selected card
  - Displays card type, HP, attacks, abilities, and other relevant details
  - Features a save/remove button to bookmark favorite cards
  - Visual indicator shows the card's saved status

## 🛠️ Technology Stack

- **React Native** - Core mobile app framework
- **TypeScript** - Type-safe programming language
- **Redux Toolkit** - State management
- **React Navigation** - Navigation between screens
- **Axios** - API requests
- **AsyncStorage** - Local storage for saved cards
- **Expo** - Development platform

## 🚀 Installation and Setup

1. **Clone the repository**:
   ```
   git clone https://github.com/halilxibrahim/pokemon-tcg-app.git
   cd pokemon-tcg-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Start the development server**:
   ```
   npx expo start
   ```

4. **Run on a device or emulator**:
   - Press `i` to open in iOS simulator
   - Press `a` to open in Android emulator
   - Or scan the QR code with the Expo Go app on your physical device

## 📊 Project Structure

```
/pokemon-tcg-app
│
├── src/                      # Application source code
│   ├── api/                  # API service and configuration
│   ├── components/           # Reusable UI components
        ├── CardItem    
│   │   └── LoadingIndicator 
│   ├── navigation/           # Navigation configuration
│   ├── screens/              # Main application screens
│   │   ├── CardListScreen    # List of Pokémon cards
│   │   └── CardDetailScreen  # Detailed view of a card
│   ├── store/                # Redux store configuration
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   └── hooks/                # Custom React hooks
│
├── assets/                   # Static assets
├── App.tsx                   # Application entry point
└── package.json              # Project dependencies
```

## 🔄 State Management

The application uses Redux Toolkit for state management to efficiently handle:
- Fetching and storing Pokémon card data
- Pagination state for the card list
- Saved cards collection
- Loading and error states

## 🌐 API Integration

The app integrates with the [Pokémon TCG API](https://docs.pokemontcg.io/) to fetch card data:
- `GET /v2/cards` - Used to retrieve the list of Pokémon cards
- `GET /v2/cards/:id` - Used to fetch detailed information about a specific card

## 📱 App Demonstration

A video demonstration of the app is available at: [Demo Video Link]


## 👨‍💻 Development Approach

This application was developed with a focus on:
- Clean, well-organized code structure
- Scalable architecture suitable for a large application
- Efficient state management
- Responsive UI design
- Type safety with TypeScript
- Regular commits with descriptive messages
