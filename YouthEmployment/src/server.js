// src/server.js
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const sequelize = require('./config/db');


const PORT = process.env.PORT || 5000;

(async () => {
  try {
    console.log('Connected to MySQL');
    // sincroniza modelos (cria as tabelas se não existirem)
    await sequelize.sync(); // alter:true para atualizar tabelas durante dev
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to the bank:', err);
  }
})();
