import { Bot, Sparkles, Leaf, Zap } from 'lucide-react';

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center p-8 md:p-16 w-full max-w-4xl mx-auto flex-1">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-14 text-center shadow-2xl w-full">

                {/* Icon */}
                <div className="flex justify-center mb-6 text-[#aae0c2]">
                    <div className="w-20 h-20 rounded-2xl bg-[#aae0c2]/10 border border-[#aae0c2]/20 flex items-center justify-center shadow-lg shadow-[#aae0c2]/10">
                        <Bot size={44} />
                    </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                    About <span className="text-[#aae0c2]">chefGPT</span>
                </h2>

                <p className="text-lg leading-relaxed opacity-80 mb-10 max-w-2xl mx-auto">
                    chefGPT is a minimalist AI-powered recipe generator explicitly designed to transform your available
                    ingredients into delicious, personalized meals — powered by Groq's lightning-fast AI.
                </p>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#aae0c2]/30 transition-colors">
                        <Zap className="text-[#aae0c2] mb-3" size={26} />
                        <h3 className="font-bold text-base mb-1">Instant Recipes</h3>
                        <p className="text-white/60 text-sm leading-relaxed">Generate full recipes in seconds using state-of-the-art language models.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#aae0c2]/30 transition-colors">
                        <Leaf className="text-[#aae0c2] mb-3" size={26} />
                        <h3 className="font-bold text-base mb-1">Reduce Food Waste</h3>
                        <p className="text-white/60 text-sm leading-relaxed">Cook smarter by using exactly what you have — no unnecessary shopping trips.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#aae0c2]/30 transition-colors">
                        <Sparkles className="text-[#aae0c2] mb-3" size={26} />
                        <h3 className="font-bold text-base mb-1">Chef-Level Tips</h3>
                        <p className="text-white/60 text-sm leading-relaxed">Every recipe comes with professional cooking tips to elevate your dish.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
