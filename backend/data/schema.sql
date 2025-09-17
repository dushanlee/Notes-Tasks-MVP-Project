
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS tasks;

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'complete', 'late')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO notes (title, content) VALUES
    ('Notes Test', 'Testing to see if notes works');

INSERT INTO tasks (title, description, status, due_date) VALUES
    ('Tasks Test 1', 'Testing to see if tasks works for "pending"', 'pending', '2026-09-15 12:00:00'),
    ('Tasks Test 2', 'Testing to see if tasks works for "late"', 'late', '2025-09-15 12:00:00'),
    ('Tasks Test 3', 'Testing to see if tasks works for "complete"', 'complete', '2025-09-15 12:00:00');
