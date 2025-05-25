-- =============================
-- TABELA DE USUÁRIOS
-- =============================
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  class VARCHAR(3),
  group_number INT,
  google_id VARCHAR(100) UNIQUE
);

-- =============================
-- TABELA DE SALAS
-- =============================
CREATE TABLE IF NOT EXISTS rooms (
  room_id SERIAL PRIMARY KEY,
  room_number VARCHAR(20) UNIQUE,
  location VARCHAR(100)
);

-- =============================
-- TABELA DE HORÁRIOS PADRÃO (faixas de 1h)
-- =============================
CREATE TABLE IF NOT EXISTS predefined_times (
  time_slot_id SERIAL PRIMARY KEY,
  start_time TIME,
  end_time TIME,
  CONSTRAINT uq_start_end UNIQUE (start_time, end_time)
);

-- Inserção dos horários padrão (07:00 às 21:00)
INSERT INTO predefined_times (start_time, end_time)
SELECT make_time(h, 0, 0), make_time(h + 1, 0, 0)
FROM generate_series(7, 21) AS h
WHERE NOT EXISTS (
  SELECT 1 FROM predefined_times 
  WHERE start_time = make_time(h, 0, 0) AND end_time = make_time(h + 1, 0, 0)
);

-- =============================
-- TABELA DE RESERVAS
-- =============================
CREATE TABLE IF NOT EXISTS bookings (
  booking_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  date DATE NOT NULL,
  time_slot_id INT NOT NULL,
  status VARCHAR(30) DEFAULT 'reservado',

  -- Chaves estrangeiras
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  CONSTRAINT fk_room FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE CASCADE,
  CONSTRAINT fk_timeslot FOREIGN KEY (time_slot_id) REFERENCES predefined_times(time_slot_id),

  -- Regras de negócio
  CONSTRAINT uq_room_date_slot UNIQUE (room_id, date, time_slot_id),  -- só uma reserva por sala/hora
  CONSTRAINT uq_user_date_slot UNIQUE (user_id, date, time_slot_id),  -- usuário não pode reservar dois locais no mesmo horário
  CONSTRAINT uq_user_day UNIQUE (user_id, date)                       -- um usuário só pode reservar uma sala por dia
);
