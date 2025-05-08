CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  class VARCHAR(3),
  group_number INT,
  google_id VARCHAR(100) UNIQUE
);

CREATE TABLE rooms (
  room_id SERIAL PRIMARY KEY,
  room_number VARCHAR(20) UNIQUE,
  location VARCHAR(100)
);

CREATE TABLE predefined_times (
  time_slot_id SERIAL PRIMARY KEY,
  start_time TIME,
  end_time TIME
);

CREATE TABLE bookings (
  booking_id SERIAL PRIMARY KEY,
  user_id INT,
  room_id INT,
  date DATE,
  time_slot_id INT,
  status VARCHAR(30),

  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE CASCADE,
  FOREIGN KEY (time_slot_id) REFERENCES predefined_times(time_slot_id)
);