CREATE DATABASE IF NOT EXISTS property_rental;
USE property_rental;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('tenant', 'owner', 'admin') NOT NULL DEFAULT 'tenant',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT,
  city VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  price_per_night DECIMAL(12,2) NOT NULL,
  bedrooms INT NOT NULL DEFAULT 0,
  bathrooms INT NOT NULL DEFAULT 0,
  max_guests INT NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_properties_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_properties_city_price (city, price_per_night),
  INDEX idx_properties_owner (owner_id)
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  tenant_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  CONSTRAINT fk_bookings_tenant FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_bookings_property_dates (property_id, start_date, end_date),
  INDEX idx_bookings_tenant (tenant_id),
  INDEX idx_bookings_status (status)
);

CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  provider VARCHAR(80) NOT NULL,
  provider_ref VARCHAR(120) NOT NULL,
  status ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  paid_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_payments_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  UNIQUE KEY uq_provider_ref (provider_ref),
  INDEX idx_payments_booking (booking_id)
);

CREATE TABLE IF NOT EXISTS maintenance_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  reported_by INT NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('open', 'in_progress', 'resolved', 'closed') NOT NULL DEFAULT 'open',
  priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_maintenance_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  CONSTRAINT fk_maintenance_reported_by FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_maintenance_property_status (property_id, status),
  INDEX idx_maintenance_reported_by (reported_by)
);

CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  booking_id INT NOT NULL,
  tenant_id INT NOT NULL,
  rating INT NOT NULL,
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reviews_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  CONSTRAINT fk_reviews_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  CONSTRAINT fk_reviews_tenant FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT chk_reviews_rating CHECK (rating >= 1 AND rating <= 5),
  UNIQUE KEY uq_reviews_booking (booking_id),
  INDEX idx_reviews_property (property_id),
  INDEX idx_reviews_tenant (tenant_id)
);

-- Seed sample owner account (password hash is placeholder and not used for demo login)
INSERT INTO users (name, email, password_hash, role)
SELECT 'Demo Owner', 'owner.demo@propertyrental.local', '$2b$10$012345678901234567890uN8WS9Vyuk3F7S3w7Dnk3a1JpN96CBa.', 'owner'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'owner.demo@propertyrental.local'
);

-- Seed sample properties for UI listing (idempotent)
INSERT INTO properties (owner_id, title, description, city, address, price_per_night, bedrooms, bathrooms, max_guests, is_active)
SELECT u.id,
       'Skyline Glass Residence',
       'Panoramic city-view apartment with premium finishes and dedicated concierge support.',
       'New York',
       '210 W 58th St, Manhattan',
       420.00,
       2,
       2,
       4,
       1
FROM users u
WHERE u.email = 'owner.demo@propertyrental.local'
  AND NOT EXISTS (SELECT 1 FROM properties WHERE title = 'Skyline Glass Residence');

INSERT INTO properties (owner_id, title, description, city, address, price_per_night, bedrooms, bathrooms, max_guests, is_active)
SELECT u.id,
       'Coastal Breeze Villa',
       'Private villa near the coast with a modern kitchen, outdoor lounge, and family-friendly layout.',
       'San Diego',
       '18 Harbor Crest Ave, La Jolla',
       580.00,
       3,
       3,
       6,
       1
FROM users u
WHERE u.email = 'owner.demo@propertyrental.local'
  AND NOT EXISTS (SELECT 1 FROM properties WHERE title = 'Coastal Breeze Villa');

INSERT INTO properties (owner_id, title, description, city, address, price_per_night, bedrooms, bathrooms, max_guests, is_active)
SELECT u.id,
       'Nordic Minimal Loft',
       'Quiet minimalist loft ideal for remote work with natural light and high-speed internet.',
       'Bengaluru',
       '44 Whitefield Main Rd',
       190.00,
       1,
       1,
       2,
       1
FROM users u
WHERE u.email = 'owner.demo@propertyrental.local'
  AND NOT EXISTS (SELECT 1 FROM properties WHERE title = 'Nordic Minimal Loft');

INSERT INTO properties (owner_id, title, description, city, address, price_per_night, bedrooms, bathrooms, max_guests, is_active)
SELECT u.id,
       'Palm Garden Retreat',
       'Spacious retreat with garden patio, ideal for group stays and long weekend bookings.',
       'Dubai',
       '12 Al Safa Park Villas',
       730.00,
       4,
       4,
       8,
       1
FROM users u
WHERE u.email = 'owner.demo@propertyrental.local'
  AND NOT EXISTS (SELECT 1 FROM properties WHERE title = 'Palm Garden Retreat');
