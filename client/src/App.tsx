import { useState } from "react";
import QuoteComponent from "./components/Quote";
import QuoteForm from "./components/QuoteForm";
import { Quote } from "shared";

export default function App() {
  const [quote, setQuote] = useState<Quote>();
  const handleQuoteSubmit = (quoteData: Quote) => {
    setQuote(quoteData);
  };

  const handleBackToForm = () => {
    setQuote(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 w-full">
      {quote ? (
        <QuoteComponent quote={quote} handleBackToForm={handleBackToForm} />
      ) : (
        <QuoteForm onSubmit={handleQuoteSubmit} />
      )}
    </div>
  );
}
