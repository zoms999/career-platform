"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { usePathname } from "next/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isLoggedIn = true; // Mock auth state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force scrolled appearance (dark text/bg) on non-home pages
  const isTransparent = isHome && !isScrolled;

  const navLinks = [
    { href: "/test", label: "진로적성검사" },
    { href: "/programs", label: "교육 프로그램" },
    { href: "/shop", label: "스토어" },
    { href: "/consulting", label: "상담/코칭" },
    { href: "/about", label: "센터소개" },
    { href: "/mypage", label: "마이페이지" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          !isTransparent || isMobileMenuOpen 
            ? "bg-background/80 backdrop-blur-md border-border shadow-sm" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">진</span>
            </div>
            <span className={cn(
               "font-bold text-xl tracking-tight transition-colors",
               "text-foreground"
            )}>
                한국진로적성센터
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/programs" className={cn("text-sm font-medium transition-colors hover:text-primary", isTransparent ? "text-slate-700 hover:text-primary" : "text-foreground/80 hover:text-foreground")}>
              교육 프로그램
            </Link>
            <Link href="/consulting" className={cn("text-sm font-medium transition-colors hover:text-primary", isTransparent ? "text-slate-700 hover:text-primary" : "text-foreground/80 hover:text-foreground")}>
              전문가 상담
            </Link>
            <Link href="/business" className={cn("text-sm font-medium transition-colors hover:text-primary", isTransparent ? "text-slate-700 hover:text-primary" : "text-foreground/80 hover:text-foreground")}>
              기관 프로그램
            </Link>
            <Link href="/shop" className={cn("text-sm font-medium transition-colors hover:text-primary", isTransparent ? "text-slate-700 hover:text-primary" : "text-foreground/80 hover:text-foreground")}>
              교구 쇼핑몰
            </Link>
            {isLoggedIn && (
              <Link href="/mypage" className={cn("text-sm font-medium transition-colors hover:text-primary", isTransparent ? "text-slate-700 hover:text-primary" : "text-foreground/80 hover:text-foreground")}>
                  마이페이지
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
                variant={"ghost"} 
                className={cn(!isTransparent ? "" : "hover:bg-slate-100")}
                asChild
            >
              <Link href="/login">로그인</Link>
            </Button>
            <Button className={cn(
                "rounded-full px-6",
                !isTransparent ? "" : "shadow-lg"
            )} asChild>
              <Link href="/signup/individual">회원가입</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className={cn("w-6 h-6", "text-foreground")} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-20 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-semibold text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link 
                href="/login" 
                className="text-lg font-medium text-muted-foreground hover:text-foreground"
                 onClick={() => setIsMobileMenuOpen(false)}
              >
                로그인
              </Link>
              <Link 
                href="/signup/individual" 
                className="text-lg font-medium text-primary hover:text-primary/80"
                 onClick={() => setIsMobileMenuOpen(false)}
              >
                회원가입
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
