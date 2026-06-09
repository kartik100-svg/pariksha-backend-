# Pariksha Backend – Online Assessment & Interview Platform

Pariksha Backend is a RESTful API server built using Node.js, Express.js, and MongoDB. It powers the Pariksha platform by handling authentication, assessments, interviews, question management, submissions, and dashboard analytics.

---

## Features

### Authentication & Authorization
- JWT-based Authentication
- Password Hashing using bcrypt.js
- Secure Login & Registration
- Role-Based Access Control (Admin & Student)
- Protected API Routes

### Assessment Management
- Create Assessments
- Update Assessments
- Delete Assessments
- Fetch Assessment Details
- Assessment Validation

### Question Management
- Add Questions
- Manage Question Bank
- Question Retrieval APIs

### Submission Management
- Submit Assessment Responses
- Track Student Performance
- Store Assessment Results

### Interview Management
- Schedule Interviews
- Manage Interview Details
- Candidate Tracking

### Dashboard Analytics
- Assessment Statistics
- Student Performance Metrics
- Upcoming Interview Data
- User Activity Tracking

### Real-Time Features
- Socket.io Integration
- WebRTC Signaling Support
- Live Interview Communication

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcrypt.js
- Cookie Parser

### Real-Time Communication
- Socket.io
- WebRTC

### Development Tools
- Nodemon
- dotenv
- CORS

---

## Project Structure

```text
backend/
├── config/
│   └── db.js
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── server.js
└── .env
```

---

## API Modules

### Authentication APIs
- User Registration
- User Login
- User Logout
- Token Verification

### Assessment APIs
- Create Assessment
- Get Assessments
- Update Assessment
- Delete Assessment

### Question APIs
- Add Question
- Get Questions
- Update Questions

### Submission APIs
- Submit Assessment
- Get Results
- Track Performance

### Interview APIs
- Schedule Interview
- Manage Interviews
- Retrieve Interview Details

### Dashboard APIs
- Fetch Dashboard Statistics
- Performance Analytics
- User Insights

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/kartik100-svg/pariksha-backend.git
cd pariksha-backend
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Server will start on:

```text
http://localhost:3000
```

---

## Security Features

- Password Hashing
- JWT Authentication
- Protected Routes
- Input Validation
- Secure API Access
- Environment Variable Protection

---

## Future Enhancements

- AI-Based Interview Evaluation
- Resume Parsing System
- Proctoring & Anti-Cheating Features
- Advanced Reporting Dashboard
- Email Notifications
- Multi-Language Coding Assessment

---

## Author

**Kartik Gaud**

LinkedIn: linkedin.com/in/kartik-gaud

GitHub: github.com/kartik100-svg
