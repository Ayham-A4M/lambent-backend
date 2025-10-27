const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser')
const DATA_BASE_CONNECTION = require('./src/config/db');
const errorHandling = require('./src/api/middlewares/errorHandling');
const cors = require('cors');
const PORT = 8000;
const app = express();

const authRoutes = require('./src/api/routes/auth');
const adminRoutes = require('./src/api/routes/admin');
const userRoutes = require('./src/api/routes/user');
const instructorRoutes = require('./src/api/routes/instructor');
DATA_BASE_CONNECTION();

const allowedOrigins = ['http://localhost:5173/', 'http://localhost:5173']
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const originClean = origin.endsWith('/') ? origin.slice(0, -1) : origin;

        if (allowedOrigins.some(allowed => {
            const allowedClean = allowed.endsWith('/') ? allowed.slice(0, -1) : allowed;
            return originClean === allowedClean;
        })) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use("/public", express.static('public'));
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/instructor", instructorRoutes);


app.use(errorHandling);

app.listen(PORT, () => {
    console.log(`app listen now on port ${PORT}`);
})
