/**
 * Parallelix Test Server
 * Use this to test the Parallelix Client Library
 * 
 * @author                  Neurosell
 * @version                 1.0.0
 * @license                 MIT
 * @author                  Ilya Rastorguev
 * @email                   start@ncommx.com
 * @website                 https://ncommx.com
 * @github                  https://github.com/Neurosell/parallelix
 */
/* Setup Express Server */
const express       =       require('express');                         // Express Library
const limiter       =       require('express-rate-limit');              // Rate Limiter
const { xss }       =       require('express-xss-sanitizer');           // XSS Filters
const fs            =       require('fs');                              // File System

/* Initialize Express App */
const app           =       express();                                  // Express App
const port          =       3000;                                       // Port

/* Setup Express Server */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client'));

/* Setup Rate Limiter */
app.use(limiter({
    windowMs: 1 * 60 * 1000,        // Limit Time (15 mins)
    limit: 1000,                    // Limit
    standardHeaders: 'draft-7',     // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false            // Use Legacy Headers
}));

/* Setup XSS Filters */
app.use(xss());
app.disable('x-powered-by');

/* Start Express Server */
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

/* Show About Page */
app.get('/', (req, res) => {
    return res.send(fs.readFileSync(__dirname + '/client/index.html', 'utf8'));
});

/* Show Client Test Page */
app.get('/test/', (req, res) => {
    return res.send(fs.readFileSync(__dirname + '/client/test.html', 'utf8'));
});