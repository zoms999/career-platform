"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string; // Content container class
}

export function AuthLayout({
  children,
  title,
  description,
  showLogo = true,
  showBackButton = false,
  onBack,
  className,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center sm:p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] bg-background sm:rounded-[2rem] sm:shadow-2xl sm:border overflow-hidden min-h-screen sm:min-h-[800px] flex flex-col relative"
      >
        {/* App Bar / Header */}
        <header className="px-6 py-5 flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-2">
            {showBackButton && (
              <button 
                onClick={onBack}
                className="p-2 -ml-2 rounded-full hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {!showBackButton && showLogo && (
               <Link href="/" className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground">진</span>
                 </div>
                 <span className="font-bold text-lg tracking-tight">한국진로적성센터</span>
               </Link>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className={cn("flex-1 px-6 pb-8 flex flex-col", className)}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2 mb-8 mt-2"
          >
           {title && (
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>
          
          <div className="flex-1">
            {children}
          </div>

          <footer className="py-6 text-center">
             <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                Career Aptitude Center
             </p>
          </footer>
        </main>
      </motion.div>
    </div>
  );
}
