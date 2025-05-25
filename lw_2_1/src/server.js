const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const routerLog = require('./middlewares/router-log.middelware');

const jsonRoutes = require('./routes/record-json.route');
const xmlRoutes = require('./routes/record-xml.route');

const PORT = 3000;
const app = express();

// Добавляем статику
app.use(express.static(path.join(__dirname, './public')));

/** Security */
// XSS, clickjacking, MIME sniffing
app.use(helmet());

// CORS
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Payload bomb
app.use(express.json({
  limit: '1kb',
}));

// Dos
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));
/**  */


/** Parser */
app.use(bodyParser.json());


/** Mideleware */
app.use(routerLog);


/** Routing */
app.use(`/api/json`, jsonRoutes);
app.use(`/api/xml`, xmlRoutes);


/** Init */
app.listen(PORT, () => {
  console.log('Server RUN', `http://localhost:${PORT}`);
});
