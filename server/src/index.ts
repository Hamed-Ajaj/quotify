import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getQuotes } from './actions/getQuotes'
import { saveQuote } from './actions/saveQuotes'

const app = new Hono()

app.use(cors())

app.get('/quotes', (c) => {
  const quotes = getQuotes()
  return c.json(quotes)
})

app.post("/quotes", async (c) => {
  const data = await c.req.json();
  saveQuote(data);
  return c.text("Quote saved");
});

export default app
