import { NextResponse } from "next/server";

interface Quote {
  text: string;
  author: string;
  // Add other properties as needed
}

let quotes: Quote[] = [];

async function fetchAndStoreQuotes() {
  const response = await fetch("https://zenquotes.io/api/quotes"); // Adjust URL if needed
  quotes = await response.json();
}

export async function GET(req: Request) {
  // Fetch and store quotes if the array is empty
  if (quotes.length === 0) {
    await fetchAndStoreQuotes();
  }

  // Randomly select a quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  return NextResponse.json(randomQuote);
}
