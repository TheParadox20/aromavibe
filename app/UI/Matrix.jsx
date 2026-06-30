import { useState } from "react";
import data from "../../public/perfumes.json";

export function eliminate(answers) {
    const keys = Object.keys(answers);
    if (keys.length === 0) return data;

    // Score each perfume by how many answer criteria it satisfies
    const scored = data.map(perfume => {
        const score = keys.reduce((acc, key) => {
            const field = perfume[key];
            const answer = answers[key];
            if (!field || !answer) return acc;
            const matches = Array.isArray(field)
                ? field.some(v => v.toLowerCase() === answer.toLowerCase())
                : field.toLowerCase() === answer.toLowerCase();
            return acc + (matches ? 1 : 0);
        }, 0);
        return { perfume, score };
    });

    // Return all perfumes tied at the highest score (guaranteed ≥ 1)
    const best = Math.max(...scored.map(s => s.score));
    return scored
    .sort((a, b) => b.score - a.score)
    .filter(s => s.score === best).map(s => s.perfume);
}

export default function Matrix({answers}){
    const base_categories = ["gender", "intensity", "vibe"];
    return(
        <div className="hidden bg-white/50 backdrop-blur-3xl text-black max-w-[50vw] overflow-y-auto max-h-[60vh] p-7 rounded-2xl fixed bottom-10 left-10 z-40">
            <h6 className="text-2xl mb-4">Perfume Matrix</h6>
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr>
                        <th className="text-left uppercase font-semibold pr-4 pb-1">Name</th>
                        {base_categories.map((category, i) => (
                            <th key={i} className="text-left uppercase font-semibold pr-4 pb-1">{category}</th>
                        ))}
                    </tr>
                    {Object.keys(answers).length > 0 && (
                        <tr className="border-b border-black/20">
                            <td className="uppercase font-semibold pr-4 pb-1 text-background">Choices</td>
                            {base_categories.map((key) => (
                                <td key={key} className="pr-4 pb-1 font-semibold text-background">
                                    {answers[key] ?? '—'}
                                </td>
                            ))}
                        </tr>
                    )}
                </thead>
                <tbody>
                    {data.map((perfume, i) => (
                        <tr key={i} className="border-t border-black/10">
                            {Object.keys(perfume)
                                .filter(key => key !== "link" && key !== "image")
                                .map((key) => (
                                    <td key={key} className="pr-4 py-1 font-medium whitespace-nowrap">
                                        {Array.isArray(perfume[key]) ? perfume[key].join(" | ") : perfume[key]}
                                    </td>
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
            <h6 className="text-2xl my-4">Possible Choices</h6>
            {
                eliminate(answers).map((perfume, i) => (
                    <p key={i} className="text-sm font-medium">{perfume.name}</p>
                ))
            }
            </div>
        </div>
    )
}