# Top-Movies

## Project Overview

This project is a web application that displays a list of top movies. It consists of a Java Spring Boot backend and a React frontend.

### Backend

The backend is a Spring Boot application that provides a REST API for managing movies.

**Key Files:**

*   `pom.xml`: Defines project dependencies and build configuration.
*   `src/main/java/com/top_movies/top_movies/TopMoviesApplication.java`: The main application class.
*   `src/main/java/com/top_movies/top_movies/controller/MovieController.java`: Defines REST endpoints for movie-related operations.
*   `src/main/java/com/top_movies/top_movies/model/Movie.java`: The data model for a movie.
*   `src/main/java/com/top_movies/top_movies/service/MovieService.java`: Contains business logic for movie operations, including loading movies from `movies.json`.
*   `src/main/resources/application.properties`: Configuration file for the Spring Boot application.
*   `src/main/resources/movies.json`: A JSON file containing a list of movies with their details.

**API Endpoints:**

*   `GET /movies/random`: Returns a random movie.
*   `GET /movies/all`: Returns a list of all movies.
*   `GET /movies/range/years?start=<year>&end=<year>`: Returns movies released between the specified start and end years.
*   `GET /movies/range/rating?minimum=<rating>`: Returns movies with a rating greater than or equal to the specified minimum.

### Frontend

The frontend is a React application that consumes the backend API to display movies.

**Key Files:**

*   `frontend/package.json`: Defines frontend dependencies and scripts.
*   `frontend/public/index.html`: The main HTML file for the React application.
*   `frontend/src/App.js`: The main React component that renders the application.
*   `frontend/src/index.js`: The entry point for the React application.

**Features:**

*   Displays a random movie.
*   Displays a paginated list of all movies.
*   Allows users to show or hide the list of all movies.

## Setup and Run

### Backend

1.  Navigate to the project root directory.
2.  Run the Spring Boot application using Maven:
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend will start on `http://localhost:8080`.

### Frontend

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm start
    ```
    The frontend will start on `http://localhost:3000` and will proxy API requests to the backend.

## Project Structure

```
Top-Movies/
├── frontend/                  # React frontend application
│   ├── public/
│   │   └── index.html         # Main HTML file
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   └── index.js           # React application entry point
│   └── package.json           # Frontend dependencies and scripts
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/top_movies/top_movies/
│   │   │       ├── TopMoviesApplication.java  # Spring Boot main class
│   │   │       ├── controller/              # REST controllers
│   │   │       │   └── MovieController.java
│   │   │       ├── model/                   # Data models
│   │   │       │   └── Movie.java
│   │   │       └── service/                 # Business logic
│   │   │           └── MovieService.java
│   │   └── resources/
│   │       ├── application.properties     # Spring Boot configuration
│   │       └── movies.json                # Movie data
│   └── test/                    # Test sources
├── HELP.md
├── mvnw                       # Maven wrapper script
├── mvnw.cmd                   # Maven wrapper script (Windows)
├── package.json               # Root package.json (for devDependencies like TailwindCSS)
├── pom.xml                    # Maven project configuration
└── README.md                  # This file
```