const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const app =  express();
const socket = require('socket.io');
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/messages', messagesRoutes);


mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connection established");
}).catch((error) => {
    console.log(error.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    })
})