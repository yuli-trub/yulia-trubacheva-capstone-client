# Wonderly - solo-travel app

The Wonderly project is a full-stack social networking web application designed to connect solo travelers with like-minded individuals around the world. The app utilizes modern technologies such as React.js, node.js, and mySQL to provide an intuitive and user-friendly interface for users to create and manage profiles, events, and friend lists. The application features robust CRUD functionality, as well as authentication and authorization features to ensure the security of user data.

The project's README file includes installation instructions, API references, and a list of the tech stack used, as well as lessons learned and future development plans.

## Tech Stack

The project uses the following technologies:

- MySQL
- React.js
- Node.js
- Express.js
- Socket.io
- Knex.js

## Features and Usage Instructions

List the features of the project and provide instructions on how to use them.

## Installation

To install the project, follow the steps below:

### Database

Create a database with <database name> in mySQL

### Server-side

1.  Clone the repository:

        $git clone https://github.com/username/repo.git

2.  Install dependencies:

        $npm install

3.  Install socket.io
    $npm i socket.io-client

4.  Create a .env file and add the necessary environment variables.

        JWT_SECRET= <generate your JWT secret>

        FRONTEND_URL= <your front-end URL>

        DB_LOCAL_DBNAME=<database name>
        DB_LOCAL_USER=
        DB_LOCAL_PASSWORD=
        DB_LOCAL_PORT=
        PORT=

        CHAT_PORT=

5.  Run the code to drop the tables, run the migrations and seeds

        $npm run all

6.  Run the server:

        $npm run dev

### Client-side

1.  Clone the repository:

        $git clone https://github.com/username/repo.git

2.  Install dependencies:

        $npm install

3.  Create a .env file and add the necessary environment variables.

        REACT_APP_BACKEND_URL=

4.  Run the client:

        $npm start

### API References
