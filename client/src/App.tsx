import { useState } from "react";
import QuoteComponent from "./components/Quote";
import QuoteForm from "./components/QuoteForm";
import { Quote } from "shared";
import { usePDF } from "@react-pdf/renderer";

export default function App() {
  const [quote, setQuote] = useState<Quote>();
  const handleQuoteSubmit = async (quoteData: Quote) => {
    setQuote(quoteData);
    console.log("Quote submitted:", quoteData);
    // const saveQuote = await fetch("http://localhost:3000/quotes", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ quote: quoteData })
    // })
    // if (!saveQuote.ok) {
    //   console.error("Failed to save quote");
    //   return;
    // }
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
