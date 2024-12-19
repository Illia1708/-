// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('public'));

// Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

// API для отримання всіх коментарів
app.get('/api/comments', async (req, res) => {
  const comments = await Comment.find().sort({ createdAt: -1 });
  res.json(comments);
});

// WebSocket логіка
io.on('connection', (socket) => {
  console.log('Користувач підключився');
  
  // Отримання нового коментаря
  socket.on('new-comment', async (data) => {
    const newComment = new Comment({ text: data.text });
    await newComment.save();
    io.emit('comment-added', newComment); // Розсилаємо новий коментар усім клієнтам
  });

  socket.on('disconnect', () => {
    console.log('Користувач відключився');
  });
});

// Запуск сервера
server.listen(3000, () => {
  console.log('Сервер працює на http://localhost:3000');
});