import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, Utensils, Carrot, ChefHat, Sparkles } from 'lucide-react';
import heroBg from '../assets/hero_bg.png';

export default function Home() {
    const [ingredients, setIngredients] = useState('');
    const navigate = useNavigate();

    const handleGenerate = () => {
        if (ingredients.trim()) {
            navigate('/recipe', { state: { ingredients } });
        }
    };

    return (
        <div className="w-full flex flex-col">
            {/* ── Hero Section ── */}
            <section
                className="relative w-full flex flex-col items-center justify-center text-center px-4 py-14 md:py-20 overflow-hidden"
                style={{ minHeight: '380px' }}
            >
                {/* Background image */}
                <img
                    src={heroBg}
                    alt="Cooking illustration background"
                    className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                    style={{ zIndex: 0 }}
                />
                {/* Dark overlay so text stays readable */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        zIndex: 1,
                        background:
                            'radial-gradient(ellipse at center, rgba(15,36,24,0.55) 0%, rgba(15,36,24,0.82) 100%)',
                    }}
                />

                {/* Hero text content */}
                <div className="relative z-10 max-w-3xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#aae0c2]/10 border border-[#aae0c2]/30 text-[#aae0c2] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                        <Sparkles size={13} />
                        Powered by AI
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-lg">
                        Delicious{' '}
                        <span className="text-[#aae0c2]">AI-Generated</span>
                        <br />
                        Recipes
                    </h1>

                    {/* Feature list */}
                    <div className="flex flex-col gap-3 text-base md:text-lg mb-10 items-start text-left bg-black/20 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl max-w-xl mx-auto">
                        <div className="flex items-center gap-3 opacity-90">
                            <Wand2 className="text-[#aae0c2] shrink-0" size={20} />
                            <span>Instantly create unique recipes using advanced AI technology</span>
                        </div>
                        <div className="flex items-center gap-3 opacity-90">
                            <Utensils className="text-[#aae0c2] shrink-0" size={20} />
                            <span>Design comprehensive menus tailored for any occasion</span>
                        </div>
                        <div className="flex items-center gap-3 opacity-90">
                            <Carrot className="text-[#aae0c2] shrink-0" size={20} />
                            <span>Get personalized recipes from your available ingredients</span>
                        </div>
                    </div>

                    {/* Scroll CTA */}
                    <p className="text-white/50 text-sm tracking-wide animate-bounce">↓ Enter your ingredients below</p>
                </div>
            </section>

            {/* ── Ingredient Input Section ── */}
            <section className="relative z-10 flex flex-col items-center px-6 py-16 w-full max-w-3xl mx-auto">
                <div className="flex flex-col gap-6 bg-white/8 backdrop-blur-md p-6 md:p-10 rounded-3xl w-full shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-white/10">
                    <div className="text-center mb-2">
                        <h2 className="text-xl font-bold text-white tracking-tight">
                            What's in your kitchen?
                        </h2>
                        <p className="text-white/50 text-sm mt-1">List your ingredients and let chefGPT do the rest</p>
                    </div>

                    <textarea
                        className="w-full p-5 rounded-xl border border-white/20 bg-white/5 text-white text-base min-h-[120px] outline-none transition-all placeholder:text-white/40 focus:border-[#aae0c2]/60 focus:bg-white/10 resize-none"
                        placeholder="e.g. Chicken breast, broccoli, garlic, olive oil, lemon..."
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />

                    <button
                        className="bg-gradient-to-r from-[#aae0c2] to-[#6fcca0] text-[#0f2418] font-extrabold text-base py-4 px-10 rounded-full cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(170,224,194,0.35)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 uppercase tracking-widest flex items-center justify-center gap-2 self-center w-full md:w-auto"
                        onClick={handleGenerate}
                        disabled={!ingredients.trim()}
                    >
                        <ChefHat size={22} />
                        Make Your Recipe
                    </button>
                </div>
            </section>
        </div>
    );
}
