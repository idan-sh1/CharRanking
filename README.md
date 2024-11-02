# Character Ranking App

This application allows users to rank characters from different series and save their rankings to a database. The current implementation includes two series, with the ability to expand to more. User rankings are saved per user in a SQL database using Entity Framework Core. This project is built with ASP.NET Web API for the backend, a React frontend, and SQL Server for data storage.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can register, log in, and log out, with data stored securely.
- **Character Ranking**: Users can rank characters in different series.
- **Persistent Storage**: Rankings are saved per user in a SQL Server database using Entity Framework Core.
- **Data Serialization**: JSON serialization supports cyclic references to handle complex relationships between users and rankings.
- **Frontend Navigation**: React-based frontend with routing between pages and session-based state management.
- **Update Rankings**: Users can update their existing rankings.

## Technologies Used

- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: ASP.NET Core Web API, C#
- **Database**: SQL Server (SSMS), Entity Framework Core (EF Core)
- **Development Environment**: Visual Studio

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/CharRanking.git
   cd CharRanking

2. **Set up the Database**
  - Open SQL Server Management Studio (SSMS) and create a new database for the application.
  - Update the connection string in appsettings.json in the backend project to point to your SQL Server database. Example:
    ```json
        "ConnectionStrings": {
            "DefaultConnection": "Server=YOUR_SERVER;Database=YOUR_DATABASE;Trusted_Connection=True;MultipleActiveResultSets=true"
        }

3. **Run Migrations**
    In the Visual Studio Package Manager Console, apply EF Core migrations to create the necessary database schema:
      ```bash
      Update-Database

4. **Build and Run the Application**
   - Start the backend server from Visual Studio.
   - Navigate to the client folder to install dependencies for the React frontend:
     ```bash
     npm install
     npm start

## Usage

1. **Register and Log In**: Start by registering a new user or logging in if you already have an account.
2. **Rank Characters**: Choose a series and drag characters into your preferred ranking order.
3. **Save Rankings**: Save rankings to persist them in the database.
4. **View or Update Rankings**: Navigate to view, update, or reorder your saved rankings.

## API Endpoints

### User and Ranking Endpoints

- `POST /rankings/{userId}`: Add new ranking data for a user, creating rankings for all series characters if they don’t exist.
- `GET /rankings/{itemType}&{userId}`: Get ranking data by series (itemType) and user ID.
- `GET /rankings/{userId}`: Retrieve all ranking data for a specific user.
- `GET /rankings/reload:{itemType}`: Reload ranking items for a series by resetting them to default values.
- `PUT /rankings/{itemType}&{userId}&{itemsRank}`: Update ranking data for a user by series and new ranking data (itemsRank).

### Authentication Endpoints

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in an existing user.
- `POST /auth/logout`: Log out the current user.
- `GET /auth/pingauth`: Ping authentication endpoint to verify user session status.

## Data Structure

### Items

Characters are grouped into item collections representing different series. Each collection has a predefined set of characters with attributes including ID, title, image ID, and ranking.

### Ranking

Each user can have one ranking entry per series. The rankings data is stored in a serialized format and includes information about each character's rank in a particular series.

## Screenshots

*Homepage:*
![Homepage](https://github.com/idan-sh1/CharRanking/blob/master/Screenshots/Homepage.png)

*Ranking 1 (One Piece):*
![Ranking 1 (One Piece)](https://github.com/idan-sh1/CharRanking/blob/master/Screenshots/Ranking1.png)

*Ranking 2 (Dragon Ball):*
![Ranking 2 (Dragon Ball)](https://github.com/idan-sh1/CharRanking/blob/master/Screenshots/Ranking2.png)

## Contributing

Feel free to open issues or submit pull requests to improve this project. For major changes, please discuss with the repository owner first.

## License

This project is licensed under the MIT License.

