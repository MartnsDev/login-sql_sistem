const mysql = require('mysql2');

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',    // Seu usuário do MySQL
  password: '',    // Sua senha do MySQL
  database: 'login_system'  // Nome do banco de dados
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida');
});

module.exports = db;
