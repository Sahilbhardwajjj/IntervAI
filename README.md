# ResumeAI

ResumeAI is a full-stack application that helps users prepare for interviews by analyzing their resume and a job description. It generates an AI-powered interview report, highlights skill gaps, creates a preparation plan, and can generate a tailored resume PDF.

## Features

- User registration and login
- Secure cookie-based authentication
- Resume PDF upload
- AI-generated interview reports
- Technical and behavioral interview questions
- Skill-gap analysis and preparation plans
- Saved interview reports
- Tailored resume PDF generation

## Project Structure

```text
ResumeAI/
├── Backend/     # Express, MongoDB, Gemini, and PDF generation API
├── Frontend/    # React and Vite client
└── README.md
```

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Sass

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- Google Gemini through `@google/genai`
- JWT authentication with HTTP-only cookies
- Multer for resume uploads
- Puppeteer for PDF generation

## Prerequisites

- Node.js 20 or later
- npm
- A MongoDB database
- A Google Gemini API key
- The dependencies required by Puppeteer for local PDF generation

## Configuration

The backend uses environment variables. From the backend directory, create a local `.env` file from the provided template:

```bash
cd Backend
cp .env.example .env
```

Set the values in `Backend/.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-long-random-secret
GOOGLE_GENAI_API_KEY=replace-with-your-google-ai-key
```

Never commit `.env` or add real credentials to documentation. If credentials have been exposed, revoke and replace them before publishing the repository.

## Running the Application

Install dependencies separately for each application:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

Start the backend in one terminal:

```bash
cd Backend
npm run dev
```

The API starts at `http://localhost:3000`.

Start the frontend in a second terminal:

```bash
cd Frontend
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

The frontend currently sends API requests to `http://localhost:3000`. If the backend is deployed elsewhere, update the `baseURL` in:

- `Frontend/src/features/auth/services/auth.api.js`
- `Frontend/src/features/interview/services/interview.api.js`

The backend CORS configuration in `Backend/src/app.js` must allow the frontend origin.

## Available Scripts

### Frontend

Run these commands from `Frontend/`:

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

### Backend

Run these commands from `Backend/`:

```bash
npm run dev       # Start the server with Nodemon
```

## Frontend Routes

| Route                     | Description                         |
| ------------------------- | ----------------------------------- |
| `/login`                  | Sign in                             |
| `/register`               | Create an account                   |
| `/`                       | View reports and start a new report |
| `/interview/:interviewId` | View a generated interview report   |

## Backend API

### Authentication

| Method | Endpoint             | Auth     | Description                     |
| ------ | -------------------- | -------- | ------------------------------- |
| `POST` | `/api/auth/register` | Public   | Create a user account           |
| `POST` | `/api/auth/login`    | Public   | Sign in and set the auth cookie |
| `GET`  | `/api/auth/logout`   | Public   | Clear the auth cookie           |
| `GET`  | `/api/auth/get-me`   | Required | Get the current user            |

### Interview Reports

These endpoints use the authentication cookie set during login.

| Method | Endpoint                                       | Auth     | Description                                                    |
| ------ | ---------------------------------------------- | -------- | -------------------------------------------------------------- |
| `POST` | `/api/interview/`                              | Required | Generate a report; send the resume as multipart field `resume` |
| `GET`  | `/api/interview/`                              | Required | List the current user's reports                                |
| `GET`  | `/api/interview/report/:interviewId`           | Required | Get one report                                                 |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Required | Generate a tailored resume PDF                                 |

## Detailed Structure

```text
Backend/
├── src/
│   ├── config/          # Database connection
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Authentication and file upload middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API route definitions
│   ├── services/        # Gemini and PDF generation services
│   └── app.js            # Express application setup
└── server.js             # Server startup

Frontend/
└── src/
    ├── features/
    │   ├── auth/         # Authentication pages, context, hooks, and API client
    │   └── interview/    # Interview pages, context, hooks, and API client
    ├── App.jsx
    ├── app.routes.jsx
    ├── main.jsx
    └── style.scss
```

## Deploying the Frontend to Vercel

Create a new Vercel project from this repository and set **Root Directory** to `Frontend`.
Vercel will detect the Vite project automatically. The included `Frontend/vercel.json`
configures the SPA fallback required by React Router, so direct links such as
`/interview/:interviewId` continue to work after deployment.

Use these project settings if Vercel does not detect them automatically:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Before deploying, update the API base URL in these files from the local backend URL to
the deployed backend URL:

- `Frontend/src/features/auth/services/auth.api.js`
- `Frontend/src/features/interview/services/interview.api.js`

Also update the backend CORS origin in `Backend/src/app.js` to the deployed Vercel URL.
The backend must be deployed separately because Vercel is only configured for the Vite
frontend.

## License

No license has been selected for this project yet.
