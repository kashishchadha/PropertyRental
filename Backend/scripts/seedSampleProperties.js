require('../src/config/env')
const pool = require('../src/config/db')

const sampleOwnerEmail = 'owner.demo@propertyrental.local'
const sampleOwnerName = 'Demo Owner'
const sampleOwnerPasswordHash = '$2b$10$012345678901234567890uN8WS9Vyuk3F7S3w7Dnk3a1JpN96CBa.'

const sampleProperties = [
  {
    title: 'Skyline Glass Residence',
    description: 'Panoramic city-view apartment with premium finishes and dedicated concierge support.',
    city: 'New York',
    address: '210 W 58th St, Manhattan',
    price_per_night: 420,
    bedrooms: 2,
    bathrooms: 2,
    max_guests: 4,
    is_active: 1
  },
  {
    title: 'Coastal Breeze Villa',
    description: 'Private villa near the coast with a modern kitchen, outdoor lounge, and family-friendly layout.',
    city: 'San Diego',
    address: '18 Harbor Crest Ave, La Jolla',
    price_per_night: 580,
    bedrooms: 3,
    bathrooms: 3,
    max_guests: 6,
    is_active: 1
  },
  {
    title: 'Nordic Minimal Loft',
    description: 'Quiet minimalist loft ideal for remote work with natural light and high-speed internet.',
    city: 'Bengaluru',
    address: '44 Whitefield Main Rd',
    price_per_night: 190,
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    is_active: 1
  },
  {
    title: 'Palm Garden Retreat',
    description: 'Spacious retreat with garden patio, ideal for group stays and long weekend bookings.',
    city: 'Dubai',
    address: '12 Al Safa Park Villas',
    price_per_night: 730,
    bedrooms: 4,
    bathrooms: 4,
    max_guests: 8,
    is_active: 1
  }
]

async function ensureOwner() {
  const [rows] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [sampleOwnerEmail])

  if (rows.length > 0) {
    return rows[0].id
  }

  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [sampleOwnerName, sampleOwnerEmail, sampleOwnerPasswordHash, 'owner']
  )

  return result.insertId
}

async function ensureProperty(ownerId, property) {
  const [rows] = await pool.query('SELECT id FROM properties WHERE title = ? LIMIT 1', [property.title])

  if (rows.length > 0) {
    return false
  }

  await pool.query(
    `INSERT INTO properties
      (owner_id, title, description, city, address, price_per_night, bedrooms, bathrooms, max_guests, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      ownerId,
      property.title,
      property.description,
      property.city,
      property.address,
      property.price_per_night,
      property.bedrooms,
      property.bathrooms,
      property.max_guests,
      property.is_active
    ]
  )

  return true
}

async function main() {
  const ownerId = await ensureOwner()
  let insertedCount = 0

  for (const property of sampleProperties) {
    const inserted = await ensureProperty(ownerId, property)
    if (inserted) insertedCount += 1
  }

  const [totals] = await pool.query('SELECT COUNT(*) AS total FROM properties')
  console.log(`Sample seed complete. Inserted ${insertedCount} property records. Total properties: ${totals[0].total}`)
}

main()
  .catch((error) => {
    console.error('Failed to seed sample properties:')
    console.error('message:', error.message)
    if (error.code) console.error('code:', error.code)
    if (error.errno) console.error('errno:', error.errno)
    if (error.sqlMessage) console.error('sqlMessage:', error.sqlMessage)
    if (error.stack) console.error(error.stack)
    process.exitCode = 1
  })
  .finally(async () => {
    await pool.end()
  })
