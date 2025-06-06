require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const routes  = require('./routes');
const engine  = require('ejs-mate');
const Room = require('./models/roomModel');

const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Sessão para login
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Configura ejs-mate ANTES do set view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos (CSS, imagens, etc.)
app.use('/css', express.static(path.join(__dirname, 'views/css')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ====================
// Passport Google OAuth
// ====================
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // Aqui você pode salvar o usuário no banco se quiser
  // Exemplo simples:
  const user = {
    user_id: profile.id,
    name: profile.displayName,
    avatar: profile.photos[0].value,
    email: profile.emails[0].value
  };
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// ====================
// Rotas de autenticação Google
// ====================
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Autenticado com sucesso, redireciona para a home
    res.redirect('/horarios');
  }
);

// Rota para logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

// ====================
// Rotas das páginas (views)
// ====================
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

app.get('/salas', ensureAuthenticated, async (req, res) => {
  const horario = req.query.horario;
  let salas;
  if (horario) {
    salas = await Room.findAvailableByHorario(horario);
  } else {
    salas = await Room.findAll();
  }
  res.render('pages/salas', { user: req.user, salas, horario });
});
app.get('/reservas', ensureAuthenticated, (req, res) => {
  res.render('pages/reservas', { user: req.user });
});
app.get('/horarios', ensureAuthenticated, (req, res) => {
  res.render('pages/horarios', { user: req.user });
});
app.get('/login', (req, res) => {
  res.render('pages/login', { hideNavFooter: true });
});

// Rotas da API (ex: /api/bookings)
app.use('/api', routes);

// Inicia o servidor
app.listen(PORT, () => console.log(`Server running → http://localhost:${PORT}/login`));