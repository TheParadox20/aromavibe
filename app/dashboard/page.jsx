// app/submissions/page.jsx
'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SubmissionsPage() {
  const { data, error, isLoading } = useSWR('/api/data', fetcher);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load data.</p>;

  return (
    <div className="p-6 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Submissions</h1>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-slate-500 text-left">
          <tr>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">IP</th>
            <th className="px-4 py-2 border">Gender</th>
            <th className="px-4 py-2 border">Volume</th>
            <th className="px-4 py-2 border">Vibe</th>
            <th className="px-4 py-2 border">Occasion</th>
            <th className="px-4 py-2 border">Final Suggestion</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry._id} className="hover:bg-gray-600 border-t">
              <td className="px-4 py-2 border whitespace-nowrap">
                {new Date(entry.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 border">{entry.ip}</td>
              <td className="px-4 py-2 border capitalize">{entry.answers?.gender}</td>
              <td className="px-4 py-2 border capitalize">{entry.answers?.intensity}</td>
              <td className="px-4 py-2 border capitalize">{entry.answers?.vibe?.replace(/-/g, ' ')}</td>
              <td className="px-4 py-2 border capitalize">{entry.answers?.occasion?.replace(/-/g, ' ')}</td>
              <td className="px-4 py-2 border">
                {
                entry.final_suggestion ? (
                  <a
                    href={entry.final_suggestion.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {entry.final_suggestion.name}
                  </a>
                ) : '—'
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <p className="mt-4 text-gray-500">No submissions yet.</p>
      )}
    </div>
  );
}