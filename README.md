# SideQuest

SideQuest is a full-stack quest-sharing web application where users can post small task requests, browse available quests, accept quests from other users, and manage quest progress.

## Live Demo

[https://side-quest-sooty.vercel.app](https://side-quest-sooty.vercel.app)

## Features

- User registration and login with JWT authentication
- Protected dashboard routes
- Create, view, edit, and delete posted quests
- Browse available quests from other users
- Accept quests and manage taken quests
- Complete or cancel accepted quests
- Status-based quest tracking
- Responsive React and Tailwind CSS interface

## Tech Stack

**Frontend**

- React
- Vite
- Tailwind CSS
- Axios
- React Router

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication

**Deployment**

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

```txt
side-quest/
  client/
  server/
```

## Environment Variables

### Client

Create `client/.env`:

```env
VITE_API_URL=http://localhost:8080/api
```

For production:

```env
VITE_API_URL=https://side-quest-5r8y.onrender.com/api
```

### Server

Create `server/.env`:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Run Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

