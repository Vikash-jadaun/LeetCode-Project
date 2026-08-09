# 🚀 LeetCode Clone

A full-stack **LeetCode-inspired coding platform** built using the **MERN stack**. The application provides an interactive environment where users can explore coding problems, write and submit solutions, view submission history, access solution videos, and get AI-powered coding assistance.

The project follows a separate **Frontend + Backend architecture**, with a React-based frontend communicating with a Node.js/Express backend through REST APIs.

---

## 🌐 Live Demo

| Resource                 | Link                                                                            |
| ------------------------ | ------------------------------------------------------------------------------- |
| 🚀 **Live Application**  | [Open LeetCode Clone](https://vikash-jadaun--leetcode-project-pied.vercel.app/) |
| 💻 **GitHub Repository** | [View Source Code](https://github.com/Vikash-jadaun/LeetCode-Project)           |

---

## ✨ Features

### 👤 User Authentication

* User registration and login
* JWT-based authentication
* Secure password hashing using bcrypt
* Protected routes
* User authorization
* Admin authorization

### 🧩 Coding Problems

* Browse coding problems
* View detailed problem statements
* Interactive coding environment
* Monaco Editor integration
* Submit solutions
* View submission results
* Track previous submissions

### 🤖 AI Coding Assistant

The platform includes an AI-powered coding assistant using **Google Gemini API**.

Users can use the AI assistant to:

* Understand coding problems
* Ask programming-related questions
* Get hints
* Discuss possible approaches
* Clarify programming concepts
* Get help while solving problems

The Gemini API is integrated through the backend so sensitive API credentials are not exposed directly to the frontend.

### 🎥 Video Solutions

* Problem-specific solution videos
* Video-based explanations
* Admin video upload functionality
* Video management through the admin panel
* Cloud-based media management

### 🛠️ Admin Panel

The application includes a dedicated admin panel for managing the coding platform.

Admins can:

* Create coding problems
* Delete coding problems
* Upload solution videos
* Manage solution videos
* Perform protected administrative operations

### 📊 Submission History

Users can view their previous submissions and track their coding activity.

---

# 🧰 Tech Stack

## Frontend

* **React**
* **Vite**
* **JavaScript**
* **Tailwind CSS**
* **DaisyUI**
* **Redux Toolkit**
* **React Redux**
* **React Router**
* **Axios**
* **Monaco Editor**
* **React Hook Form**
* **Zod**
* **Lucide React**

## Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Redis**
* **JWT**
* **bcrypt**
* **Axios**
* **dotenv**
* **CORS**

## External Services

* **Google Gemini API** — AI-powered coding assistance
* **Cloudinary** — Video/media management
* **Redis** — Backend caching/support

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │        User         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │                     │
                         │ • React             │
                         │ • Redux Toolkit     │
                         │ • Tailwind CSS      │
                         │ • Monaco Editor     │
                         └──────────┬──────────┘
                                    │
                              REST APIs
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Express Backend   │
                         │                     │
                         │ • Authentication    │
                         │ • Problems          │
                         │ • Submissions       │
                         │ • AI Chat           │
                         │ • Videos            │
                         │ • Admin             │
                         └──────┬──────┬───────┘
                                │      │
                  ┌─────────────┘      └──────────────┐
                  ▼                                   ▼
          ┌───────────────┐                   ┌───────────────┐
          │    MongoDB    │                   │ External APIs │
          │               │                   │               │
          │ • Users       │                   │ • Gemini AI   │
          │ • Problems    │                   │ • Cloudinary  │
          │ • Submissions │                   │               │
          │ • Videos      │                   └───────────────┘
          └───────────────┘
```

---

# 📁 Project Structure

```text
LeetCode-Project/
│
├── Frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── AdminDelete.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── AdminUpload.jsx
│   │   │   ├── AdminVideo.jsx
│   │   │   ├── ChatAI.jsx
│   │   │   ├── Editorial.jsx
│   │   │   └── SubmissionHistory.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Admin.jsx
│   │   │   ├── Homepage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ProblemPage.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── store/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vercel.json
│
│
└── Backend/
    │
    ├── src/
    │   │
    │   ├── Controllers/
    │   ├── config/
    │   ├── middleware/
    │   ├── modules/
    │   ├── routes/
    │   ├── utils/
    │   └── index.js
    │
    └── package.json
```

---

# 🔐 Authentication & Authorization

The application uses **JWT-based authentication**.

```text
User
 │
 ▼
Login / Signup
 │
 ▼
Express API
 │
 ├── Validate credentials
 │
 ├── bcrypt password verification
 │
 └── Generate JWT
 │
 ▼
Authenticated User
 │
 ▼
Protected API Routes
```

Passwords are securely hashed using **bcrypt** before being stored.

JWT tokens are used to authenticate users when accessing protected resources.

Administrative operations are protected using separate admin authorization middleware.

---

# 🗄️ Database

The application uses **MongoDB** with **Mongoose** for database management.

The backend contains separate modules/models for application data such as:

```text
User
 │
 ├── Authentication details
 ├── Role
 └── User information

Problem
 │
 ├── Problem statement
 ├── Difficulty
 └── Problem information

Submission
 │
 ├── User
 ├── Problem
 ├── Submitted code
 └── Submission information

Solution Video
 │
 ├── Problem
 ├── Video information
 └── Media URL
```

---

# 🤖 AI Integration

The application integrates **Google Gemini API** to provide an AI-powered coding assistant.

### AI Request Flow

```text
User
 │
 │ Coding Question
 ▼
React AI Chat
 │
 │ API Request
 ▼
Express Backend
 │
 │ Gemini API
 ▼
Google Gemini
 │
 │ AI Response
 ▼
Express Backend
 │
 ▼
React AI Chat
 │
 ▼
User
```

The Gemini API key is stored in the backend environment variables rather than being exposed in the frontend.

---

# 🎥 Video Solution Architecture

Solution videos are managed through the backend and cloud media storage.

```text
Admin
 │
 ▼
Upload Solution Video
 │
 ▼
Backend
 │
 ▼
Cloudinary
 │
 ▼
Media URL
 │
 ▼
Database
 │
 ▼
User
 │
 ▼
Watch Solution
```

---

# 🛠️ Admin Features

The admin panel provides protected functionality for managing platform content.

### Problem Management

* Create problems
* Delete problems
* Manage problem information

### Video Management

* Upload solution videos
* Manage solution videos
* Associate videos with coding problems

### Authorization

Only authorized administrators can access administrative operations.

---

# 💻 Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/Vikash-jadaun/LeetCode-Project.git

cd LeetCode-Project
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `Backend` directory.

Example:

```env
PORT=3000

DB_CONNECTION_STRING=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> Add only the environment variables actually required by your backend configuration.

---

## 3. Start Backend

For development using Nodemon:

```bash
npx nodemon src/index.js
```

Or start normally:

```bash
node src/index.js
```

The backend will run on the configured port.

---

# 🌐 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

If your frontend requires an environment variable, create:

```text
.env
```

Example:

```env
VITE_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The application will then be available through the Vite development server.

---

# 🔑 Environment Variables

Never upload sensitive credentials to GitHub.

Keep the following types of values inside `.env` files:

* MongoDB connection string
* JWT secret
* Gemini API key
* Cloudinary credentials
* Other private API credentials

Add `.env` to `.gitignore`:

```gitignore
node_modules/
.env
.env.local
dist/
```

---

# 🚀 Deployment

The frontend is deployed using **Vercel**.

### Production Application

🚀 **https://vikash-jadaun--leetcode-project-pied.vercel.app/**

The frontend communicates with the deployed backend through the configured API URL.

For deployment, make sure all required environment variables are configured in the hosting platform.

---

# 🧪 Development Commands

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

### Backend

```bash
cd Backend
npm install
npx nodemon src/index.js
```

### Production Backend

```bash
node src/index.js
```

---

# 🎯 Key Learning Outcomes

Through this project, I gained practical experience in:

* Full-stack MERN development
* REST API development
* React application architecture
* Redux Toolkit state management
* JWT authentication
* Role-based authorization
* Password hashing with bcrypt
* MongoDB and Mongoose
* Protected API routes
* Monaco Editor integration
* AI API integration
* Cloudinary media management
* Frontend-backend communication
* Environment variable management
* Admin dashboard development
* Full-stack deployment

---

# 📌 Project Highlights

| Feature          | Technology             |
| ---------------- | ---------------------- |
| Frontend         | React + Vite           |
| Styling          | Tailwind CSS + DaisyUI |
| State Management | Redux Toolkit          |
| Code Editor      | Monaco Editor          |
| Backend          | Node.js + Express      |
| Database         | MongoDB                |
| ODM              | Mongoose               |
| Authentication   | JWT + bcrypt           |
| AI Assistant     | Google Gemini          |
| Media Storage    | Cloudinary             |
| Deployment       | Vercel                 |

---

# 🔮 Future Improvements

* [ ] Online code execution
* [ ] Multiple programming language support
* [ ] Problem filtering by difficulty
* [ ] Problem filtering by topic
* [ ] User profiles
* [ ] Coding statistics
* [ ] Leaderboard
* [ ] Daily coding challenges
* [ ] Coding contests
* [ ] Detailed submission analytics
* [ ] Automated testing
* [ ] CI/CD pipeline
* [ ] Docker support

---

# 👨‍💻 Author

## Vikash Jadaun

B.Tech CSE (AI) Student

💻 **GitHub:** [Vikash-jadaun](https://github.com/Vikash-jadaun)

🚀 **Live Project:** [LeetCode Clone](https://vikash-jadaun--leetcode-project-pied.vercel.app/)

---

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.

**Built with ❤️ using the MERN stack.**
