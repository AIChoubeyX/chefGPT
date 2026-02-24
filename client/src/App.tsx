import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Recipe from './pages/Recipe';
import logoImg from './assets/chefgpt_logo.png';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen relative z-10 w-full overflow-hidden">
        <div className="bg-overlay"></div>

        {/* Navbar */}
        <nav className="flex justify-between items-center py-5 px-6 md:px-14 bg-black/20 backdrop-blur-md border-b border-white/10 z-20 sticky top-0">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            <img
              src={logoImg}
              alt="ChefGPT Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-[#aae0c2]/20 ring-1 ring-white/20 group-hover:ring-[#aae0c2]/50 transition-all"
            />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-xl tracking-tight text-white">
                chef<span className="text-[#aae0c2]">GPT</span>
              </span>
              <span className="text-[10px] text-white/50 tracking-widest uppercase font-medium">AI Recipe Engine</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/about"
              className="text-white/80 hover:text-[#aae0c2] transition-all font-medium text-sm border border-white/10 hover:border-[#aae0c2]/50 px-5 py-2 rounded-full hover:bg-[#aae0c2]/5"
            >
              About
            </Link>
          </div>
        </nav>

        <main className="flex-1 w-full flex flex-col items-center z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipe" element={<Recipe />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="text-center p-8 mt-auto border-t border-white/10 opacity-60 text-xs tracking-wider w-full z-10">
          <p>Made with ❤️ by Ashutosh Choubey, Himanshu Varma, Keshari Nandan, Chirashree Mahato, Nandini Sarkar & MD Aman</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
