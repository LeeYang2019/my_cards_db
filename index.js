const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

const connectDb = require('./config/db');

dotenv.config();

connectDb();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`listening to port ${PORT}`));
