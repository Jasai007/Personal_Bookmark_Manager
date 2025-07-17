# Personal Bookmark Manager

This project is a Personal Bookmark Manager built using the MERN stack (MongoDB, Express.js, React, Node.js) with TypeScript and Vite for the frontend.

## Step-by-step Setup

### 1. Backend Setup
- The backend is located in the `server/` directory.
- It uses Express.js with routes defined in `server/routes/` for authentication and bookmark management.
- MongoDB is used as the database, configured in `server/config/mongodb.js`.
- Models for User and Bookmark are defined in `server/models/`.
- Middleware for authentication is in `server/middleware/auth.js`.
- The backend server entry point is `server/index.js`.
- Dependencies are managed via `server/package.json`.

### 2. Frontend Setup
- The frontend source code is in the `src/` directory.
- React with TypeScript is used, with components in `src/components/`.
- Pages like Dashboard and Login are in `src/pages/`.
- Authentication context is managed in `src/contexts/AuthContext.tsx`.
- Styling is done using Tailwind CSS configured via `tailwind.config.js`.
- Vite is used as the build tool, configured in `vite.config.ts`.
- The main app entry is `src/App.tsx` and `src/main.tsx`.

### 3. Database
- MongoDB is the database used to store users and bookmarks.
- Connection details and setup are in `server/config/mongodb.js`.

### 4. Deployment
- The project is deployed on Render, as indicated by the `render.yaml` file.
- This file contains deployment configuration for the server.

## Project Structure Summary
- `server/`: Backend API, database models, routes, middleware, and configuration.
- `src/`: Frontend React application with components, pages, contexts, and styles.
- Configuration files for TypeScript, ESLint, Tailwind CSS, and Vite at the root level.
- `README.md` provides a brief project description.

## Description
This setup allows users to manage bookmarks with authentication, storing data in MongoDB, and a React frontend for user interaction, all deployed on Render for hosting.

## Running the Project Locally
1. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   cd server
   npm start
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open the frontend in your browser at the address provided by Vite (usually `http://localhost:3000`).


