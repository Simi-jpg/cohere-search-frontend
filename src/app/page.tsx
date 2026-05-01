"use client";

import { useState } from "react";
import SearchResults from "@/components/SearchResults";

const API_URL = "https://cohere-semantic-search-api-p96p.vercel.app/api";

export default function Home() {
  const [documentText, setDocumentText] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  async function handleAddDocument() {
    if (!documentText.trim()) {
      setMessage("Please enter some document text first.");
      return;
    }


    const response = await fetch(`${API_URL}/documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: documentText,
      }),
    });

    const data = await response.json();

    setMessage(data.message);
    setDocumentText("");
  }
  
  async function handleSearch() {
    if (!query.trim()) {
      return;
    }

    const response = await fetch(
      `${API_URL}/search?query=${encodeURIComponent(query)}`
    );

    const data = await response.json();
    const matches = data.best_match;

    if (Array.isArray(matches)) {
      setResults(matches);
    } else if (typeof matches === "string") {
      try {
        setResults(JSON.parse(matches));
      } catch {
        setResults([matches]);
      }
    } else {
      setResults([]);
    }
}


  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <section className="mx-auto max-w-3xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Cohere Semantic Search
          </p>
          <h1 className="mt-3 text-4xl font-bold">
            Search your notes by meaning, not just keywords.
          </h1>
          <p className="mt-4 text-slate-300">
            Add text documents, then ask questions to find the most relevant
            stored context using Cohere embeddings.
          </p>
        </div>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Add a document</h2>

          <textarea
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            placeholder="Paste a note, paragraph, or textbook excerpt..."
            className="mt-4 min-h-32 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-cyan-400"
          />

          <button
            onClick={handleAddDocument}
            className="mt-4 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950">
            Add Document
          </button>
          {message && <p className="mt-3 text-sm text-cyan-300">{message}</p>}
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Search</h2>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question..."
            className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-cyan-400"
          />

          <button 
            onClick={handleSearch}
            className="mt-4 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950">
            Search
          </button>

          <div className="mt-6">
            <SearchResults results={results} />
          </div>
        </section>
      </section>
    </main>
  );
}