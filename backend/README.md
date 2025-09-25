## Backend Project Documentation
This document provides a comprehensive overview of the backend server's structure, technologies, and how to get started.

### Project Overview
This is a backend server built with Node.js and Express. It is designed to be a RESTful API and uses a well-organized folder structure to ensure maintainability and scalability.

### Project Structure
The project's source code is located in the root directory. The following is a breakdown of the key directories and files:

* config/: This directory contains configuration files for the application, such as database connection settings, and other environment-specific variables.

* controllers/: Request handlers are defined here. These files contain the logic for processing incoming requests and sending responses.

* middleware/: This folder holds reusable middleware functions. Middleware can be used for tasks like authentication, logging, and error handling.

* models/: This directory is for defining the data models, which represent the structure of your data (e.g. user schema). It is used with sequelize.

* routers/: This directory contains the route definitions for the API. Each file defines the endpoints for a specific resource, such as /api/auth or /api/word.

* utils/: This folder is for helper functions and other utility code that can be reused across the application.

* .env: This file is used to store environment variables (e.g., API keys, configuration settings) and is not committed to version control. It needs
  * DATABASE_NAME 
  * DATABASE_USERNAME 
  * DATABASE_PASSWORD 
  * DATABASE_HOST 
  * JWT_SECRET

* package.json & package-lock.json: These files manage the project's dependencies, scripts, and other metadata.

* server.js: The entry point for the application. It initializes the Express app, connects to the database, and starts the server.

### Getting Started
To get the project up and running on your local machine, follow these steps:

1. Clone the repository:

```git clone https://github.com/MilkiyasGebru/hiring-milkiyas-gebru-flashcards.git```

2. Navigate to the project directory:

```cd backend```

3. Install dependencies:
Install the required packages.


```npm install ```


4. Create a .env file:
Create aa .env and fill in your specific environment variables, such as your database connection string and any necessary API keys.

5. Run the development server:

``` npm run dev ```

The server will start and be accessible at the address specified in your configuration (e.g., http://localhost:3000).


Technologies Used
* Node.js: A JavaScript runtime environment.

* Express: A fast, unopinionated, minimalist web framework for Node.js.

* Sequelize: An ORM for a relational database.

* JWT (Example): JSON Web Tokens for authentication.

* Bcrypt: A library for hashing passwords.