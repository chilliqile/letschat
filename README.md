<h1 style="text-align: center">LetsChat</h1>

A full-stack messaging application built with React, Node.js, Express, Prisma and PostgreSQL. LetsChat combines a component-based frontend with a REST API, session-based authentication, user profiles, and one-to-one messaging.

## Links

- Front-end repository: [letschat](https://github.com/csdropout/letschat)
- Front-end deployment: [deployment](https://csdropout.github.io/letschat/)
- Back-end repository: [letschat-api](https://github.com/csdropout/letschat-api)

## Overview

LetsChat is a full-stack web application that brings together a React frontend and an Express backend to support user authentication, profile management and direct messaging.

The frontend provides the user interface and client-side navigation, while the backend exposes API endpoints for authentication, user lookup, profile updates, and message retrieval and sending. PostgreSQL stores application data, with Prisma ORM providing database access and persistent session storage.

This project demonstrates practical full-stack development, API integration, relational data modeling, authentication, and deployment configuration.

## Tech Stack

### Frontend

<table>
    <thead>
        <tr>
            <th scope="col">Technology</th>
            <th scope="col">Purpose</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>React</td>
            <td>Component-based user interface</td>
        </tr>
        <tr>
            <td>React Router</td>
            <td>Client-side routing</td>
        </tr>
        <tr>
            <td>Vite</td>
            <td>Development server and production build tooling</td>
        </tr>
        <tr>
            <td>JavaScript (ES modules)</td>
            <td>Application logic</td>
        </tr>
        <tr>
            <td>CSS Modules</td>
            <td>Local scoping of component styles</td>
        </tr>
    </tbody>
</table>

### Backend

<table>
    <thead>
        <tr>
            <th scope="col">Technology</th>
            <th scope="col">Purpose</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Node.js</td>
            <td>JavaScript runtime</td>
        </tr>
        <tr>
            <td>Express</td>
            <td>HTTP API and middleware</td>
        </tr>
        <tr>
            <td>Passport.js</td>
            <td>Local username/password authentication</td>
        </tr>
        <tr>
            <td>Express Session</td>
            <td>Session-based authentication</td>
        </tr>
        <tr>
            <td>Prisma ORM</td>
            <td>Database access and schema management</td>
        </tr>
        <tr>
            <td>bcryptjs</td>
            <td>Password hashing and verification</td>
        </tr>
        <tr>
            <td>express-validator</td>
            <td>Request validation</td>
        </tr>
    </tbody>
</table>

## Features

- User authentication — Sign up, log in, log out, and check the current authentication state.
- Direct messaging — Retrieve conversation history and send messages to individual users.
- Profile management — View and update profile information.
- Session persistence — Maintain authenticated sessions using Express Session and a Prisma-backed session store.
- Relational data modeling — Represent users, messages, senders, and recipients in PostgreSQL.
- Filter conversations - Search for a conversation by username or last sent message.

## Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL database
- git

### Installation

1. **Clone the repositories:**

   ```bash
   git clone https://github.com/csdropout/letschat.git
   git clone https://github.com/csdropout/letschat-api.git
   cd letschat
   ```

2. **Configure the backend**

   ```bash
   cd letschat-api
   npm install
   ```

   Create a .env file in the backend root:

   ```env
    PORT=3000
    SESSION_SECRET=replace-with-a-long-random-secret
    DATABASE_URL=your-postgresql-connection-string
    DIRECT_URL=your-direct-postgresql-connection-string
   ```

   Configure the values for your PostgreSQL provider. DATABASE_URL is used by the Prisma client, while DIRECT_URL is configured for Prisma schema and migration operations.

3. **Set up database**
   The backend uses Prisma with PostgreSQL. Generate the Prisma client and apply the existing migrations:

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

4. **Start the backend**

   ```bash
   node app.js
   ```

5. **Configure the frontend**
   Open a second terminal:

   ```bash
   cd letschat
   npm install
   ```

   Create a .env file in the frontend root:

   ```env
   VITE_SERVER_URL=http://localhost:3000
   ```

6. **Start the frontend**

   ```bash
   npm run dev
   ```

   Open the local URL printed by Vite.

   For local development, ensure the backend's CORS configuration allows the frontend origin and that requests include credentials where required for session authentication.

## API Overview

The backend exposes the following routes:

<table>
    <thead>
        <th scope="col">Method</th>
        <th scope="col">Endpoint</th>
        <th scope="col">Description</th>
    </thead>
    <tbody>
        <tr>
            <td>POST</td>
            <td>/auth/sign-up</td>
            <td>Register a user</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/auth/login</td>
            <td>Authenticate with username and password</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/auth/logout</td>
            <td>End the authenticated session</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/auth/me</td>
            <td>Check authentication status</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/users</td>
            <td>Search users</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/users/:username</td>
            <td>Retrieve a user by username</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/profile</td>
            <td>Retrieve the current profile</td>
        </tr>
        <tr>
            <td>PATCH</td>
            <td>/profile</td>
            <td>Update the current profile</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/messages</td>
            <td>Retrieve message list of current user</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/messages/:username</td>
            <td>Retrieve a conversation with user</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/messages/:username</td>
            <td>Send a message to a user</td>
        </tr>
    </tbody>
</table>

## Database Models

The Prisma schema defines 3 primary models:

- User — Stores a unique username, password hash, optional bio, and optional avatar URL.
- Message — Stores message text, creation time, sender, and recipient.
- Session — Stores session identifiers, serialized session data, and expiration information.

## Future Improvements

Potential improvements include:

- Add automated unit and integration tests.
- Document API request and response schemas with OpenAPI or Swagger.

Built with Vite + React, Express and PostgreSQL.
