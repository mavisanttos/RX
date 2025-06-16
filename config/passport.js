// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../config/db');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const name = profile.displayName;
    const google_id = profile.id;

    const user = await pool.query('SELECT * FROM users WHERE google_id = $1', [google_id]);

    if (user.rows.length > 0) {
      return done(null, user.rows[0]);
    }

    const newUser = await pool.query(
      'INSERT INTO users (name, email, google_id) VALUES ($1, $2, $3) RETURNING *',
      [name, email, google_id]
    );

    return done(null, newUser.rows[0]);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
  done(null, result.rows[0]);
});


// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/horarios');
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

module.exports = router;


// Trecho no server.js
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

app.use(session({
  secret: 'rx_super_secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
