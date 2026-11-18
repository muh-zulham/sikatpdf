"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, ShieldCheck, ChevronRight, Command, X, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { tools } from "@/config/tools";
import { toolVariants } from "@/config/tool-variants";

interface HeaderProps {
  onOpenMobile: () => void;
}

export function Header({ onOpenMobile }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const variant = toolVariants.find((v) => `/${v.slug}` === pathname);
  const activeTool = tools.find((t) => t.href === pathname || t.id === variant?.baseToolId);
  const inGuides = pathname === "/guides" || pathname.startsWith("/guides/");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const filteredTools = searchQuery.trim()
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tools;

  const handleSelectTool = (href: string) => {
    setSearchOpen(false);
    router.push(href);
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-[52px] shrink-0 items-center justify-between border-b border-[var(--kp-border)] bg-[var(--kp-header-bg)] px-4 sm:px-6 transition-colors">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobile}
            className="md:hidden p-1.5 -ml-1 text-[var(--kp-text-secondary)] hover:text-[var(--kp-text-primary)] hover:bg-[var(--kp-surface)] rounded-md transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>

          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-[var(--kp-text-secondary)] truncate">
            <Link href="/" className="hover:text-[var(--kp-text-primary)] transition-colors shrink-0 font-semibold text-[var(--kp-text-primary)]">
              SikatPDF
            </Link>
            {activeTool ? (
              <>
                <ChevronRight size={12} className="text-[var(--kp-text-muted)] shrink-0" />
                <span className="text-[var(--kp-text-muted)] shrink-0">{activeTool.category}</span>
                <ChevronRight size={12} className="text-[var(--kp-text-muted)] shrink-0" />
                <span className="text-[var(--kp-text-primary)] font-semibold truncate">{variant ? variant.definition.name : activeTool.name}</span>
              </>
            ) : inGuides ? (
              <>
                <ChevronRight size={12} className="text-[var(--kp-text-muted)] shrink-0" />
                <Link href="/guides" className="text-[var(--kp-text-primary)] font-semibold truncate hover:underline">Guides</Link>
              </>
            ) : (
              <>
                <ChevronRight size={12} className="text-[var(--kp-text-muted)] shrink-0" />
                <span className="text-[var(--kp-text-primary)] font-semibold truncate">All Tools</span>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Tool Search Command Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 h-8 px-2.5 text-xs text-[var(--kp-text-secondary)] bg-[var(--kp-bg-alt)] hover:bg-[var(--kp-surface)] border border-[var(--kp-border)]/80 rounded-md transition-all group"
          >
            <Search size={14} className="text-[var(--kp-text-muted)] group-hover:text-[var(--kp-text-secondary)] transition-colors" />
            <span className="text-[var(--kp-text-secondary)]">Search tools...</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-sans font-medium text-[var(--kp-text-muted)] bg-[var(--kp-surface)] border border-[var(--kp-border)] rounded shadow-2xs ml-2">
              <Command size={10} />K
            </kbd>
          </button>

          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden p-1.5 text-[var(--kp-text-secondary)] hover:text-[var(--kp-text-primary)] hover:bg-[var(--kp-surface)] rounded-md"
            aria-label="Search tools"
          >
            <Search size={18} />
          </button>

          {/* Docs Link */}
          <Link
            href="/docs"
            className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1 rounded-md transition-colors"
          >
            <BookOpen size={14} />
            <span>Docs</span>
          </Link>

        
          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <ShieldCheck size={12} className="text-emerald-600" />
            <span>100% Client-Side Engine</span>
          </div>

          

          {/* GitHub link */}
          
        </div>
      </header>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-[var(--kp-text-primary)]/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="fixed inset-0"
            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-lg bg-[var(--kp-surface)] rounded-xl shadow-xl border border-[var(--kp-border)] overflow-hidden z-10 flex flex-col max-h-[80vh]">
            <div className="flex items-center border-b border-[var(--kp-border)] px-3.5 py-2.5 bg-[var(--kp-bg-alt)]/50">
              <Search size={16} className="text-[var(--kp-text-muted)] shrink-0 mr-2.5" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PDF tools by name or description..."
                className="w-full text-sm bg-transparent border-none outline-none text-[var(--kp-text-primary)] placeholder:text-[var(--kp-text-muted)]"
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                className="p-1 text-[var(--kp-text-muted)] hover:text-[var(--kp-text-secondary)] rounded-md shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredTools.length > 0 ? (
                filteredTools.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTool(t.href)}
                    className="w-full text-left flex items-start gap-3 p-2.5 hover:bg-[var(--kp-surface)]/80 rounded-lg transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-[var(--kp-surface)] text-[var(--kp-text-secondary)] group-hover:bg-[var(--kp-surface)] group-hover:text-[var(--kp-text-primary)] group-hover:shadow-2xs transition-colors shrink-0">
                      <Search size={14} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[var(--kp-text-primary)]">{t.name}</span>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--kp-text-muted)] bg-[var(--kp-surface)] px-1.5 py-0.5 rounded">
                          {t.category}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--kp-text-secondary)] truncate mt-0.5">{t.description}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-[var(--kp-text-secondary)]">
                  No tools found matching &quot;{searchQuery}&quot;
                </div>
              )}
            </div>

            <div className="border-t border-[var(--kp-border-subtle)] px-3 py-2 bg-[var(--kp-bg-alt)] text-[11px] text-[var(--kp-text-muted)] flex items-center justify-between">
              <span>Use keyboard arrows or click to select</span>
              <kbd className="text-[10px] bg-[var(--kp-surface)] border border-[var(--kp-border)] rounded px-1">ESC to close</kbd>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
