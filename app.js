const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const db = require('./db');  // Conexão com o banco de dados

const app = express();
const port = 3000;

// Middleware para análise de dados dos formulários e sessão
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: true
}));

// Middleware para verificar se o usuário está logado
const checkAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  next();
};

// Página principal (login)
app.get('/', (req, res) => {
  const alertMessage = req.query.alert;
  res.sendFile(__dirname + '/index.html');  // Página de login
});

// Rota de login (POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificando se o usuário existe no banco de dados
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Erro no login:', err);
      return res.status(500).send('Erro no login');
    }

    if (results.length === 0) {
      return res.redirect('/?alert=Usuário não encontrado');
    }

    // Comparando a senha
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        // Armazenar o id do usuário na sessão
        req.session.userId = results[0].id;
        res.redirect('/home');
      } else {
        res.redirect('/?alert=Senha incorreta');
      }
    });
  });
});

// Página de cadastro
app.get('/cadastro', (req, res) => {
  const alertMessage = req.query.alert;
  res.sendFile(__dirname + '/cadastro.html');  // Página de cadastro
});

// Rota de cadastro (POST)
app.post('/cadastro', (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário já existe no banco de dados
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Erro ao verificar o usuário:', err);
      return res.status(500).send('Erro ao verificar o cadastro');
    }

    if (results.length > 0) {
      // Se o usuário já existe, exibe uma mensagem de alerta
      return res.redirect('/cadastro?alert=Este usuário já está cadastrado');
    }

    // Se o usuário não existe, criptografa a senha
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) throw err;

      // Inserir o novo usuário no banco de dados
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) {
          console.error('Erro ao cadastrar:', err);
          return res.status(500).send('Erro no cadastro');
        }
        res.redirect('/');  // Redireciona para a página de login após o cadastro
      });
    });
  });
});

// Página após login
app.get('/home', checkAuth, (req, res) => {
  res.sendFile(__dirname + '/home.html');  // Página após o login
});

// Rota de logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Erro ao sair');
    }
    res.redirect('/');  // Redireciona para o login
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
