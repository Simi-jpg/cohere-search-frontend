type SearchResultsProps = {
  results: string[];
};

export default function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) {
    return <p className="text-sm text-slate-400">No results yet.</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-slate-400">
        Showing top {results.length} matches
      </p>

      {results.map((result, index) => (
        <article
          key={index}
          className="rounded-2xl border border-slate-700 bg-slate-950 p-5 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              Match #{index + 1}
            </span>
          </div>

          <p className="leading-7 text-slate-200">{result}</p>
        </article>
      ))}
    </div>
  );
}