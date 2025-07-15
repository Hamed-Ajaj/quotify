import { Database } from "bun:sqlite";

const db = new Database("quotify.sqlite");

// Create quotes table
db.run(`
  CREATE TABLE IF NOT EXISTS quotes (
    id TEXT PRIMARY KEY,
    freelancer_name TEXT,
    client_name TEXT,
    client_email TEXT,
    total REAL,
    created_at TEXT
  );
`);

db.run(`
  INSERT INTO quotes (id, freelancer_name, client_name, client_email, total) VALUES (1, 'Hamed', 'Ali', 'ali@gmail.com',200.0);
`)

export default db;
