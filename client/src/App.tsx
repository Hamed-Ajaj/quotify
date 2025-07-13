import { useState } from "react";
import QuoteForm from "./components/QuoteForm";
import PDFPreview from "./components/PDFPreview";
import type { Quote } from "shared";

export default function App() {
  const [quote, setQuote] = useState<Quote | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {quote ? (
        <PDFPreview quote={quote} />
      ) : (
        <QuoteForm onSubmit={setQuote} />
      )}
    </div>
  );
}
