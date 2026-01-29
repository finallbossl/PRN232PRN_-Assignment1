import Link from "next/link";
import { ShoppingBag, PlusCircle, Home, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="glass sticky top-0 z-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                LUXE<span className="text-blue-600">.</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:flex items-center space-x-10">
            <Link href="/" className="text-slate-500 hover:text-blue-600 font-semibold transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
              Collection
            </Link>
            <Link 
              href="/products/new" 
              className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 group"
            >
              <PlusCircle className="h-5 w-5 text-blue-400 group-hover:rotate-90 transition-transform duration-300" />
              Add Product
            </Link>
          </div>

          <div className="flex sm:hidden">
            <Link href="/products/new" className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
              <PlusCircle className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
