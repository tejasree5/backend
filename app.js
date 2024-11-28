const emailVerifyRoutes = require('./routes/emailVerifyRoutes');
app.use('/api/auth', emailVerifyRoutes);

const session = require('express-session');

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
