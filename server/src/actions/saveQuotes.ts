
// server/actions/saveQuote.ts
import db from "../db";

export function saveQuote(quote: {
  id: string;
  freelancer_name: string;
  client_name: string;
  client_email: string;
  total: number;
  created_at: string;
}) {
  db.run(
    `INSERT INTO quotes (id, freelancer_name, client_name, client_email, total, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    quote.invoiceDetails.invoiceNo,
    quote.freelancer.name,
    quote.client.name,
    quote.client.email,
    quote.total,
    quote.invoiceDetails.invoiceDate
  );

}
