import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, ChefHat, Flame, BookOpen, Lightbulb } from 'lucide-react';

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Strip markdown bold/italic markers and leading bullet chars */
function clean(line: string) {
    return line
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/^[-•]\s*/, '')
        .trim();
}

/**
 * Parse the raw AI text into labelled sections.
 * Strategy: split on lines that look like headings (ALL CAPS, or ending with ':',
 * or starting with a '#'), then group the lines that follow under that heading.
 */
function parseRecipe(raw: string): { heading: string; lines: string[] }[] {
    const rawLines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    const sections: { heading: string; lines: string[] }[] = [];
    let current: { heading: string; lines: string[] } | null = null;

    const isHeading = (l: string) =>
        /^#{1,3}\s/.test(l) ||         // markdown heading
        /^[A-Z][^a-z]{3,}:?$/.test(l) || // ALL CAPS word(s)
        /\*\*[^*]+\*\*:?$/.test(l) ||  // **Bold** heading
        (l.endsWith(':') && l.split(' ').length <= 6); // Short phrase ending in colon

    for (const raw of rawLines) {
        const line = clean(raw);
        if (!line) continue;

        if (isHeading(raw)) {
            if (current) sections.push(current);
            current = { heading: line.replace(/:$/, ''), lines: [] };
        } else {
            if (!current) current = { heading: 'Recipe', lines: [] };
            current.lines.push(line);
        }
    }
    if (current) sections.push(current);
    return sections;
}

/** Pick an icon based on heading keywords */
function sectionIcon(heading: string) {
    const h = heading.toLowerCase();
    if (h.includes('ingredient')) return <ChefHat size={18} className="text-[#aae0c2]" />;
    if (h.includes('step') || h.includes('instruction') || h.includes('direction') || h.includes('method'))
        return <Flame size={18} className="text-[#aae0c2]" />;
    if (h.includes('tip') || h.includes('note') || h.includes('serving'))
        return <Lightbulb size={18} className="text-[#aae0c2]" />;
    return <BookOpen size={18} className="text-[#aae0c2]" />;
}

/** Decide if a section's lines should be rendered as a numbered list */
function isOrderedSection(heading: string) {
    const h = heading.toLowerCase();
    return h.includes('step') || h.includes('instruction') || h.includes('direction') || h.includes('method');
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Recipe() {
    const location = useLocation();
    const navigate = useNavigate();
    const ingredients = location.state?.ingredients;

    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!ingredients) { navigate('/'); return; }

        const generateRecipe = async () => {
            setLoading(true);
            setError('');
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/recipe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ingredients }),
                });
                if (!response.ok) throw new Error('Failed to generate recipe');
                const data = await response.json();
                setRecipe(data.recipe);
            } catch (err) {
                setError('Could not generate a recipe right now. Please ensure the backend is running and the Groq API key is configured.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        generateRecipe();
    }, [ingredients, navigate]);

    const sections = recipe ? parseRecipe(recipe) : [];

    return (
        <div className="flex flex-col flex-1 w-full max-w-3xl mx-auto px-4 py-10">
            {/* Back button */}
            <button
                onClick={() => navigate('/')}
                className="self-start flex items-center gap-2 mb-8 text-white/60 hover:text-[#aae0c2] transition-colors text-sm font-medium"
            >
                <ArrowLeft size={16} />
                Back to ingredients
            </button>

            {/* Loading state */}
            {loading && (
                <div className="flex flex-col items-center justify-center flex-1 gap-5 py-24">
                    <Loader2 className="animate-spin text-[#aae0c2]" size={52} />
                    <p className="text-white/70 text-lg font-medium animate-pulse">
                        Our AI Chef is crafting your recipe…
                    </p>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="bg-red-500/10 border border-red-400/30 p-6 rounded-2xl w-full text-center">
                    <p className="text-red-300 leading-relaxed">{error}</p>
                </div>
            )}

            {/* Recipe output — structured */}
            {!loading && sections.length > 0 && (
                <div className="flex flex-col gap-0 w-full">
                    {/* Page title */}
                    <div className="mb-8 pb-6 border-b border-white/10">
                        <p className="text-[#aae0c2] text-xs font-semibold uppercase tracking-widest mb-2">
                            Your Personalized Recipe
                        </p>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                            {sections[0]?.heading || 'Generated Recipe'}
                        </h2>
                    </div>

                    {/* Remaining sections */}
                    {sections.slice(1).map((sec, i) => (
                        <div
                            key={i}
                            className="mb-6 bg-white/4 border border-white/8 rounded-2xl overflow-hidden"
                        >
                            {/* Section header */}
                            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/8 bg-white/4">
                                {sectionIcon(sec.heading)}
                                <h3 className="font-semibold text-white text-base tracking-tight">
                                    {sec.heading}
                                </h3>
                            </div>

                            {/* Section body */}
                            <div className="px-6 py-5">
                                {isOrderedSection(sec.heading) ? (
                                    <ol className="flex flex-col gap-4">
                                        {sec.lines.map((line, j) => (
                                            <li key={j} className="flex gap-4 items-start text-white/85 text-sm leading-relaxed">
                                                <span className="shrink-0 w-6 h-6 rounded-full bg-[#aae0c2]/15 border border-[#aae0c2]/25 text-[#aae0c2] text-xs font-bold flex items-center justify-center mt-0.5">
                                                    {j + 1}
                                                </span>
                                                <span>{line}</span>
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <ul className="flex flex-col gap-2">
                                        {sec.lines.map((line, j) => (
                                            <li key={j} className="flex gap-3 items-start text-white/85 text-sm leading-relaxed">
                                                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#aae0c2] mt-2"></span>
                                                <span>{line}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* If AI returned only one section (no headings), render all its lines */}
                    {sections.length === 1 && sections[0].lines.length > 0 && (
                        <div className="bg-white/4 border border-white/8 rounded-2xl px-6 py-5 flex flex-col gap-2">
                            {sections[0].lines.map((line, j) => (
                                <p key={j} className="text-white/85 text-sm leading-relaxed">
                                    {line}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Try again */}
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 bg-gradient-to-r from-[#aae0c2] to-[#6fcca0] text-[#0f2418] font-bold text-sm py-3 px-8 rounded-full hover:shadow-[0_8px_24px_rgba(170,224,194,0.3)] hover:-translate-y-0.5 transition-all uppercase tracking-widest"
                        >
                            <ChefHat size={18} />
                            Try Another Recipe
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
