const hpp = require('hpp');
const xss = require('xss-clean');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const jobsRoute = require('./routes/jobsRouter');
const jobSeekerRoute = require('./routes/jobSeekerRouter');
const errorController = require('./controllers/errorController');
const cors = require('cors');
const app = express();

/* Security Measures */

// To add security headers
app.use(helmet());

// To parse json data
app.use(express.json({ limit: '5mb' }));

// To prevent from query injection
app.use(mongoSanitize());

// To prevent injection of html code
app.use(xss());

// To prevent repetative query parameters
app.use(
  hpp({
    whitelist: [
      // currently no whitelist here
    ],
  })
);

// To parse static files
app.use(express.static('./public'));

// Checking which server we are in (development or production)
if (process.env.NODE_ENV)
  console.log(`${process.env.NODE_ENV.toUpperCase()} SERVER`);

// To simplify api logs in terminal
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limiting API's per miliseconds
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: 'Too many requrest from this IP',
});
app.use('/api', limiter);

app.use(cors());
app.use('/api/v1/job-seekers', jobSeekerRoute);
app.use('/api/v1/jobs', jobsRoute);

// Global Error Handling Middleware
app.use(errorController);

module.exports = app;
