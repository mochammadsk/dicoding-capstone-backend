const cors = require('cors');
const path = require('path');
const express = require('express');
const session = require('express-session');
const swaggerRoutes = require('./src/routes/swagger.routes');

require('dotenv').config();

// Create app
const app = express();

// Middleware CORS & Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    credentials: true,
  })
);

// Midelleware session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000, // 1 minute
      secure: false,
    },
  })
);

// Middleware Logger
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Call routes
require('./src/routes/authentication.routes')(app);
require('./src/routes/user.routes')(app);

// For testing only
app.get('/', (_req, res) => {
  res.send('Ramal Kripto API');
});

// Swagger
app.use(swaggerRoutes);

module.exports = app;
