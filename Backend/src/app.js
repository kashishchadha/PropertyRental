const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');
const paymentController = require('./modules/payment/payment.controller');

const routes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.set('trust proxy', env.trustProxy);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (env.corsOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin not allowed by CORS'));
  }
};

const apiLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  }
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.post('/api/v1/payments/stripe/webhook', express.raw({ type: 'application/json' }), paymentController.stripeWebhook);
app.use(express.json({ limit: '100kb' }));
app.use('/api', apiLimiter);

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'API is healthy' });
});

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
