const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const db = require('./db');  
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: true
}));


const checkAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  next();
};

// Página principal (login)
app.get('/', (req, res) => {
  const alertMessage = req.query.alert;
  res.sendFile(__dirname + '/index.html');  
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Erro no login:', err);
      return res.status(500).send('Erro no login');
    }
    if (results.length === 0) {
      return res.redirect('/?alert=Usuário não encontrado');
    }
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
  
        req.session.userId = results[0].id;
        res.redirect('/home');
      } else {
        res.redirect('/?alert=Senha incorreta');
      }
    });
  });
});

app.get('/cadastro', (req, res) => {
  const alertMessage = req.query.alert;
  res.sendFile(__dirname + '/cadastro.html');  
});

app.post('/cadastro', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Erro ao verificar o usuário:', err);
      return res.status(500).send('Erro ao verificar o cadastro');
    }

    if (results.length > 0) {
  
      return res.redirect('/cadastro?alert=Este usuário já está cadastrado');
    }
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) throw err;
      
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) {
          console.error('Erro ao cadastrar:', err);
          return res.status(500).send('Erro no cadastro');
        }
        res.redirect('/');  
      });
    });
  });
});
app.get('/home', checkAuth, (req, res) => {
  res.sendFile(__dirname + '/home.html'); 
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Erro ao sair');
    }
    res.redirect('/');  
  });
});
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
