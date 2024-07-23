# [Brightbell](https://bright-bell.vercel.app/home)

Brightbell is a fitness tracking app that allows users to log their daily fitness updates, view their history, and gain insights from their data.

## Table of Contents

- [Features](#features)
  - [Authentication and Authorisation](#authentication-and-authorisation)
  - [Dashboard](#dashboard)
  - [Daily Logger](#daily-logger)
  - [Workout Recommendation and View History](#workout-recommendation-and-view-history)
  - [Profile and Edit Profile](#profile-and-edit-profile)
  - [Database Design](#database-design)
- [Learning Curve and Challenges](#learning-curve-and-challenges)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

### Authentication and Authorisation
**Contributor:** Akshath

**Description:**  
Implemented user authentication and authorization functionalities. This includes user registration, login, and secure access to personal fitness data.

**Learning Curve and Challenges:**  
- **Learning Curve:** Learning about different authentication methods and integrating them into a Next.js application.
- **Challenges:** Ensuring secure data storage and implementing robust authorization checks to protect user data.

### Dashboard
**Contributor:** Kunal

**Description:**  
Developed the dashboard that presents users with graphs and charts to provide insights into their fitness activities over time. This includes tracking progress, trends, and other relevant statistics.

**Learning Curve and Challenges:**  
- **Learning Curve:** Learning how to integrate data visualization libraries and customize them for dynamic data representation.
- **Challenges:** Ensuring real-time data updates and maintaining performance while rendering complex graphs and charts.

### Daily Logger
**Contributor:** Sumedh

**Description:**  
Created the daily logger feature, allowing users to log their daily workouts and activities. This includes input forms for various fitness activities and storing this data for future reference.

**Learning Curve and Challenges:**  
- **Learning Curve:** Understanding how to manage state and handle form inputs efficiently in a Next.js application.
- **Challenges:** Ensuring data consistency and handling edge cases where users might input incorrect or incomplete data.

### Workout Recommendation and View History
**Contributor:** Shruti

**Description:**  
Implemented workout recommendation algorithms based on user preferences and past activities. Also developed the feature for users to view their workout history.

**Learning Curve and Challenges:**  
- **Learning Curve:** Learning about recommendation algorithms and how to apply them to fitness data.
- **Challenges:** Ensuring recommendations are relevant and useful, and effectively displaying historical data in an understandable format.

### Profile and Edit Profile
**Contributor:** Rassim

**Description:**  
Created the user profile and edit profile features, allowing users to manage their personal information and preferences within the app.

**Learning Curve and Challenges:**  
- **Learning Curve:** Learning about form handling and state management in Next.js.
- **Challenges:** Ensuring data validation and providing a seamless user experience for updating profile information.

### Database Design
**Contributor:** Sumedh

**Description:**  
Designed the database schema to store and manage all user data, workout logs, and application settings efficiently.

**Learning Curve and Challenges:**  
- **Learning Curve:** Understanding database design principles and learning to use a suitable database management system.
- **Challenges:** Ensuring data integrity, optimizing queries for performance, and handling complex relationships between different data entities.

## Learning Curve and Challenges

### Authentication and Authorisation
- **Learning Curve:** Understanding OAuth, JWT, and other authentication protocols. Integrating Firebase for authentication and managing user sessions.
- **Challenges:** Implementing secure password storage, handling token expiration, and ensuring that only authenticated users can access certain parts of the application.

### Dashboard
- **Learning Curve:** Getting familiar with charting libraries such as Chart.js or D3.js, and integrating these with Next.js.
- **Challenges:** Handling large datasets, optimizing performance for rendering charts, and ensuring cross-browser compatibility for the visualizations.

### Daily Logger
- **Learning Curve:** Learning to manage complex form states and handle validations effectively.
- **Challenges:** Creating an intuitive user interface for logging various types of workouts, ensuring data accuracy, and integrating with the backend for data persistence.

### Workout Recommendation and View History
- **Learning Curve:** Understanding how to develop and apply recommendation algorithms.
- **Challenges:** Ensuring the relevance and accuracy of recommendations, and effectively displaying historical workout data.

### Profile and Edit Profile
- **Learning Curve:** Learning about form handling and state management in Next.js.
- **Challenges:** Ensuring data validation, providing a seamless user experience, and integrating profile updates with the backend.

### Database Design
- **Learning Curve:** Learning database design principles and choosing the right database management system.
- **Challenges:** Ensuring data integrity, optimizing query performance, and managing complex data relationships.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/brightbell.git
    ```
2. Install dependencies:
    ```bash
    cd brightbell
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```

## Contributing

We welcome contributions from the community. Please read our [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

We would like to thank everyone who contributed to the development of Brightbell and helped us bring this project to life. Your support and feedback have been invaluable.
