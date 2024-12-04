# Deck Builder Magic The Gathering Application

This project is a Deck Builder application built with TypeScript and React. It allows users to manage and analyze their card decks, providing various statistics and functionalities to add or remove cards.

## Features

- **Deck Statistics**: Displays total cards, unique cards, average converted mana cost (CMC), color distribution, and type distribution.
- **Deck Card Management**: Allows users to add or remove cards from the deck.
- **Responsive Design**: Ensures a good user experience on different devices.

## Technologies Used

- **TypeScript**: For type safety and better development experience.
- **React**: For building the user interface.
- **Next.js**: For server-side rendering and static site generation.
- **Tailwind CSS**: For styling the application.
- **Lucide-React**: For icons used in the application.
- **GitHub Actions**: For continuous integration and deployment.

## Project Structure

- `components/`: Contains React components used in the application.
    - `DeckStats.tsx`: Component to display deck statistics.
    - `DeckCard.tsx`: Component to display and manage individual cards in the deck.
- `.github/workflows/`: Contains GitHub Actions workflows for CI/CD.
    - `dev-pipeline.yml`: Workflow for installing dependencies, checking Prettier formatting, running lint checks, and TypeScript type checking.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (version 7 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/deck-builder.git
   cd deck-builder