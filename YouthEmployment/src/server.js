import dotenv from 'dotenv';
import app from './app.js';
import sequelize from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL successfully');
    await sequelize.sync(); // create tables if not exists
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Error connecting to the base:', err.message);
  }
})();
