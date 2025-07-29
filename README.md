<h1>Sistema de Login com Node.js e MySQL</h1>

<p>Este é um projeto de sistema de login simples utilizando <strong>Node.js</strong>, <strong>Express</strong>, <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong> e <strong>MySQL</strong> como banco de dados.</p>

<hr>

<h2>📂 Tecnologias Utilizadas</h2>
<ul>
  <li>Node.js</li>
  <li>Express</li>
  <li>MySQL2</li>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>JavaScript</li>
</ul>

<hr>

<h2>🚀 Como Instalar e Rodar o Projeto</h2>

<h3>1. Clone o repositório</h3>
<pre><code>git clone https://github.com/MartnsDev/https://github.com/MartnsProjetos/login-sql_sistem.git
cd seu-repositorio ou pasta
</code></pre>

<h3>2. Instale as dependências</h3>
<p>Certifique-se que o Node.js esteja instalado em sua máquina.</p>
<pre><code>npm install express mysql2
</code></pre>

<h3>3. Configure o banco de dados MySQL</h3>
<p>Você precisa criar um banco de dados no MySQL chamado <code>login_system</code> ou modificar o nome conforme sua preferência.</p>

<p>Exemplo de configuração no seu projeto:</p>
<pre><code>const mysql = require('mysql2');

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',    // substitua pelo seu usuário do MySQL
  password: '',    // substitua pela sua senha
  database: '     // Coloque o nome da database
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida');
});

module.exports = db;
</code></pre>

<h3>Crie a tabela de usuários</h3>
<pre><code>CREATE DATABASE "Oque Você quiser";

USE login_system;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
</code></pre>

<h3>4. Inicie o servidor</h3>
<pre><code>node app.js
</code></pre>

<p>Se tudo estiver certo, acesse: <code>http://localhost:3000</code></p>

<hr>

<h2>📋 Observações</h2>
<ul>
  <li>O projeto pode ser expandido com sessões, bcrypt para senhas seguras e proteção contra SQL Injection.</li>
  <li>Você pode mudar a porta no arquivo <code>app.js</code> se necessário.</li>
</ul>

<hr>

<h2>📎 Contato</h2>
<p>Matheus Martins<br>
🔗 <a href="https://linkedin.com/in/matheusmartnsdeveloper" target="_blank">LinkedIn</a><br>
💻 <a href="https://github.com/MartnsDev" target="_blank">GitHub</a></p>

<hr>

<h1>🚀 Vamos codar!</h1>


