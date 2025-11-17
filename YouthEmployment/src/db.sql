CREATE DATABASE IF NOT EXISTS youthemployment;
USE youthemployment;

CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employer_name VARCHAR(100),
  title VARCHAR(100),
  description VARCHAR(100),
  location VARCHAR(100),
  salary DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jobs (employer_name, title, description, location, salary)
VALUES
('Milto', 'TechNova Ltd', 'Junior Developer', 'Luanda', 550.00),
('Duane','AgroVida', 'Farm Manager', 'Huambo', 800.00);

