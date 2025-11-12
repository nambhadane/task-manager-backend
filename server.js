const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://task-manager-frontend-new.vercel.app',
    'https://new-task-frontend-6z0kmeg4f-namrata-bhadanes-projects.vercel.app',
    'https://task-manager-frontend-updated.vercel.app', // ✅ final production frontend
    'https://task-manager-frontend-upda-git-2bac4d-namrata-bhadanes-projects.vercel.app' // optional preview URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));



app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 50000,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

app.use('/api/tasks', taskRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
