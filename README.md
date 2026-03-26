# AI Resume Builder and Career Assistant

A modern, responsive, full-stack AI-powered resume builder allowing users to create, preview, and download ATS-friendly resumes. Includes an AI Assistant for suggesting skills, improving summaries, and enhancing project descriptions.

## Tech Stack
- **Frontend**: React.js with Vite, Tailwind CSS, React Router DOM, React Hook Form, Zustand/Context, Framer Motion, html2pdf.js
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT & bcrypt

## Features
- Secure User Authentication (JWT)
- Live side-by-side Resume Preview
- Multiple Resume Templates (Modern, Minimal, Creative, ATS)
- PDF Export with perfect layout rendering
- Mock AI Assistant integration for generative enhancements
- Dark Mode support
- Responsive SaaS-style glassmorphism UI

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance running locally (port 27017) or MongoDB Atlas URI

### 1. Backend Setup
1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a \`.env\` file in the \`backend\` root or duplicate \`.env.example\`:
   \`\`\`env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ai-resume-builder
   JWT_SECRET=supersecretjwtkeythatissecure
   JWT_EXPIRE=30d
   NODE_ENV=development
   \`\`\`
4. Start the backend development server:
   \`\`\`bash
   npm run dev
   \`\`\`
   The server should start on \`http://localhost:5000\`.

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the Vite development server:
   \`\`\`bash
   npm run dev
   \`\`\`
   The client should start on \`http://localhost:5173\`.

### Default API
If the backend is running on a different port, update the \`baseURL\` in \`frontend/src/services/api.js\`. By default, it uses \`http://localhost:5000/api\`.

## Usage
1. Open your browser to the local frontend link.
2. Sign Up as a new user.
3. Once in the dashboard, click "Create New Resume" or "View Templates" to begin building.
4. Try the AI Assistant features under the Summary, Experience, and Skills tabs.
5. Export your resume as PDF using the button on the top right.
