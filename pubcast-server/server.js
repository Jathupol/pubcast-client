const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});
const prisma = new PrismaClient();

// Increase payload size limit (100MB for JSON)
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));

// CORS setup
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Static file serving
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ 
  storage: storage, 
  limits: { fileSize: Infinity } // No limit on file size
});

app.post('/api/send', upload.single('image'), async (req, res) => {
  const { message, username } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  console.log('Received data:', { username, message, imageUrl });

  try {
    const newMessage = await prisma.message.create({
      data: {
        username,
        message,
        imageUrl,
        createdAt: new Date() // เพิ่มเวลาที่สร้างข้อมูล
      }
    });

    io.emit('new_message', { id: newMessage.id, username, message, imageUrl });
    console.log('Message saved:', newMessage);

    res.status(200).json({ message: 'Message sent' });

    // เริ่มต้นนับถอยหลัง 30 วินาที
    setTimeout(async () => {
      try {
        // หาข้อมูลที่มีค่าเวลาน้อยกว่าหรือเท่ากับเวลาที่ตั้งไว้
        const oldMessage = await prisma.message.findFirst({
          where: { createdAt: { lte: newMessage.createdAt } },
          orderBy: { createdAt: 'asc' },
        });
        
        // ถ้ามีข้อมูลให้ลบทันที
        if (oldMessage) {
          await prisma.message.delete({
            where: { id: oldMessage.id },
          });

          console.log('Message deleted:', oldMessage);
          
          // ส่งการอัพเดทหากมีการลบข้อมูล
          io.emit('delete_message', { id: oldMessage.id });
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }, 30000); // 30 วินาที

  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

// Socket.io connection event
io.on('connection', (socket) => {
  console.log('New client connected');

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
