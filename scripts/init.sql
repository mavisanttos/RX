-- Tabela de usuários
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,   -- Define user_id como chave primária
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  class VARCHAR(3),
  group_number INT,
  google_id VARCHAR(100) UNIQUE
);

-- Tabela de salas
CREATE TABLE rooms (
  room_id SERIAL PRIMARY KEY,   -- Define room_id como chave primária
  room_number VARCHAR(20) UNIQUE,
  location VARCHAR(100)
);

-- Tabela de reservas
CREATE TABLE bookings (
  booking_id SERIAL PRIMARY KEY,  -- Define booking_id como chave primária
  user_id INT,
  room_id INT,
  date DATE,
  start_time TIME,
  end_time TIME,
  status VARCHAR(30),
  
  -- Definindo as chaves estrangeiras
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE CASCADE
);