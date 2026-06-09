import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import codeRoutes from "./routes/codeRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/code", codeRoutes);

app.get("/", (req, res) => {
  res.send("PARIKSHA Backend Running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const roomUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-interview-room", ({ roomId, userRole }) => {
    socket.join(roomId);

    socket.roomId = roomId;
    socket.userRole = userRole;

    if (!roomUsers[roomId]) {
      roomUsers[roomId] = {
        student: false,
        interviewer: false,
      };
    }

    roomUsers[roomId][userRole] = true;

    console.log(`${userRole} joined room: ${roomId}`);

    io.to(roomId).emit("presence-update", roomUsers[roomId]);
  });

  socket.on("ready-for-call", ({ roomId, role }) => {
    socket.to(roomId).emit("start-call", { role });
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-updated", code);
  });

  socket.on("webrtc-offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("webrtc-offer", { offer });
  });

  socket.on("webrtc-answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("webrtc-answer", { answer });
  });

  socket.on("webrtc-ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("webrtc-ice-candidate", { candidate });
  });

  socket.on("send-message", ({ roomId, message, sender }) => {
    io.to(roomId).emit("receive-message", {
      message,
      sender,
      time: new Date(),
    });
  });

  socket.on("disconnect", () => {
    if (socket.roomId && socket.userRole && roomUsers[socket.roomId]) {
      roomUsers[socket.roomId][socket.userRole] = false;

      io.to(socket.roomId).emit(
        "presence-update",
        roomUsers[socket.roomId]
      );
    }

    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});