"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Search, Loader2, PackageX, SlidersHorizontal, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async (query = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts(search);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="lg:flex items-center gap-16">
            <div className="flex-1 max-w-2xl">
              <span className="inline-block py-2 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-6">
                New Summer Arrivals
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter">
                ELEVATE <br />
                <span className="text-gradient">EVERYDAY.</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed">
                Discover our curated collection of premium essentials designed for modern life. Sophisticated, timeless, and sustainably crafted.
              </p>
              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <a href="#collection" className="bg-slate-900 text-white px-8 py-5 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-2xl shadow-slate-200">
                  Shop Collection <ArrowRight className="h-5 w-5" />
                </a>
                <Link href="/products/new" className="bg-white border border-slate-200 text-slate-900 px-8 py-5 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                  Join Luxe Club
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block flex-1 relative">
              <div className="relative aspect-[3/4] max-w-sm ml-auto rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/20 rotate-3 transform group-hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80" 
                  alt="Hero" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 flex items-center gap-4 max-w-xs -rotate-2">
                <div className="bg-green-100 text-green-600 p-3 rounded-2xl">
                  <PackageX className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">In Stock</p>
                  <p className="text-lg font-bold text-slate-900">Premium Cotton Tee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-100">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">
              The Collection
            </h2>
            <p className="text-slate-500 font-medium">
              Explore our range of premium apparel and accessories.
            </p>
          </div>
          
          <div className="relative w-full max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by name, color, or style..."
              className="w-full pl-14 pr-16 py-5 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
              <SlidersHorizontal className="h-4 w-4 text-slate-600" />
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="h-16 w-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-slate-500 font-bold mt-6 tracking-widest uppercase text-xs">Loading Luxe Style...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <div className="bg-white p-8 rounded-full shadow-xl mb-6">
              <PackageX className="h-12 w-12 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 underline decoration-blue-500/30">End of the line</h3>
            <p className="text-slate-500 font-medium italic">We couldn't find any items matching your search.</p>
          </div>
        )}
      </main>

      {/* Footer minimal */}
      <footer className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-slate-900 p-2 rounded-lg">
              <ShoppingBag className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 uppercase">LUXE</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">© 2026 LUXE Premium App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
