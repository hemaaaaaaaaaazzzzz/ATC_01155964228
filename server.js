const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');


dotenv.config({ path: 'config.env' });
const dbConnection = require('./config/database.js');
const ApiError = require('./utils/apiError.js');
const globalErrorHandler = require('./middleware/errorHandler.js');
// routes
const authRoute = require('./routes/authRoute.js');
const userRoute = require('./routes/userRoute.js');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoute = require('./routes/bookingroute.js');


//database connection
dbConnection();


//express app
const app = express();

// Middleware
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
};

//routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoute);

// Hande unkown routes
app.use((req, res, next) => {
  next(new ApiError(`Cannot handle this URL: ${req.originalUrl} `, 400));
});

// Global error
app.use(globalErrorHandler);






const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});