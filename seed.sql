USE ticket_booking_db;

INSERT INTO Events (title, description, date, location, capacity, ticketsBooked, imageUrl, createdAt, updatedAt) 
VALUES 
(
  'TANTRAZ26 - CodeWars (Coding)', 
  'Flagship Competitive Programming event for TANTRAZ 4th National Level Tech Fest Organised by Department of Computer Science and Engineering School of Computing.', 
  '2026-05-15 09:00:00', 
  'CSE Block - Main Lab', 
  120, 
  0, 
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800', 
  NOW(), 
  NOW()
),
(
  'TANTRAZ26 - WebWeavers (Web Dev)', 
  '24-hour frontend web development challenge during TANTRAZ 4th National Level Tech Fest.', 
  '2026-05-16 10:00:00', 
  'Innovation Hub', 
  80, 
  0, 
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800', 
  NOW(), 
  NOW()
),
(
  'TANTRAZ26 - BGMI Clash (Non-Tech)', 
  'Ultimate E-Sports BGMI tournament! TANTRAZ 4th National Level Tech Fest Organised by CSE Department.', 
  '2026-05-16 14:00:00', 
  'Main Auditorium', 
  200, 
  0, 
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800', 
  NOW(), 
  NOW()
),
(
  'TANTRAZ26 - Mystery Escape Room (Non-Tech)', 
  'Solve puzzles and escape the room! A fun non-technical event by the School of Computing.', 
  '2026-05-17 11:00:00', 
  'Block B - Room 204', 
  50, 
  0, 
  'https://images.unsplash.com/photo-1605380562620-e2b2c93d2bbf?q=80&w=800', 
  NOW(), 
  NOW()
);
