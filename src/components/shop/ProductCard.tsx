"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
  isBest?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className={cn("group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700", className)}
    >
      {/* Image Container */}
      <Link href={`/shop/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1">
            {product.isNew && <Badge className="bg-blue-500 hover:bg-blue-600">NEW</Badge>}
            {product.isBest && <Badge className="bg-orange-500 hover:bg-orange-600">BEST</Badge>}
        </div>
        
        {/* Overlay Actions (Desktop) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button size="icon" variant="ghost" className="rounded-full bg-white text-slate-900 hover:bg-white hover:scale-110 transition-all">
                <Heart className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full bg-white text-slate-900 hover:bg-white hover:scale-110 transition-all">
                <ShoppingCart className="w-5 h-5" />
            </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="text-xs text-muted-foreground mb-1 font-medium">{product.category}</div>
        <Link href={`/shop/${product.id}`}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
            </h3>
        </Link>
        <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
                {product.price.toLocaleString()}원
            </span>
            {/* Mobile Action (Visible only on mobile usually, but here simplified) */}
        </div>
      </div>
    </motion.div>
  );
}
