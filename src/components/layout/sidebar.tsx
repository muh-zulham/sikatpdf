"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PanelLeftClose, PanelLeftOpen, ShieldCheck, Search, X, BookOpen, GraduationCap } from "lucide-react";
import { tools } from "@/config/tools";
import { ToolDefinition } from "@/types";
import { cn } from "@/lib/utils";
import { SidebarGroup } from "./sidebar-group";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredToolsByCategory = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const result: Record<string, ToolDefinition[]> = {};

    for (const tool of tools) {
      if (
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.keywords?.some((k) => k.toLowerCase().includes(q))
      ) {
        if (!result[tool.category]) {
          result[tool.category] = [];
        }
        result[tool.category].push(tool);
      }
    }
    return result;
  }, [searchQuery]);

  const totalFilteredCount = useMemo(() => {
    return Object.values(filteredToolsByCategory).reduce((acc, list) => acc + list.length, 0);
  }, [filteredToolsByCategory]);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r border-[var(--kp-border)] bg-[var(--kp-sidebar-bg)] transition-all duration-200 ease-out z-20 shrink-0 select-none",
        isCollapsed ? "w-[64px]" : "w-64"
      )}
    >
      {/* Sidebar Header / Brand */}
      <div className="flex h-[52px] items-center border-b border-[var(--kp-border)]/80 px-3.5 justify-between bg-[var(--kp-sidebar-bg)] shrink-0">
        <Link href="/" className={cn("flex items-center gap-2.5 min-w-0 transition-opacity", isCollapsed && "hidden")}>
          <div className="shrink-0 flex items-center justify-center">
            <Image src="/logo.png" alt="SikatPDF Logo" width={18} height={18} className="rounded-2xs" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-xs tracking-tight text-[var(--kp-text-primary)] truncate">
              SikatPDF
            </span>
            <span className="text-[10px] font-mono text-[var(--kp-text-muted)] leading-none">
              100 Tools Suite
            </span>
          </div>
        </Link>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-1.5 text-[var(--kp-text-muted)] hover:text-[var(--kp-text-primary)] hover:bg-[var(--kp-surface)] rounded-md transition-colors",
            isCollapsed && "mx-auto"
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Sidebar Tool Search Filter */}
      {!isCollapsed && (
        <div className="p-2 border-b border-[var(--kp-border-subtle)] bg-[var(--kp-bg-alt)]/50">
          <div className="relative flex items-center">
            <Search size={13} className="absolute left-2.5 text-[var(--kp-text-muted)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter 100 tools..."
              className="w-full h-7 pl-7 pr-7 text-[12px] bg-[var(--kp-surface)] border border-[var(--kp-border)]/80 rounded outline-none focus:border-[var(--kp-accent)] placeholder:text-[var(--kp-text-muted)] font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 text-[var(--kp-text-muted)] hover:text-[var(--kp-text-secondary)] p-0.5 rounded"
              >
                <X size={12} />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-1 px-1 flex items-center justify-between text-[10px] text-[var(--kp-text-muted)] font-mono">
              <span>Showing {totalFilteredCount} of 100 tools</span>
            </div>
          )}
        </div>
      )}

      {/* Sidebar Navigation */}
      <div className="flex-1 overflow-y-auto py-3 space-y-4 scrollbar-thin">
        {Object.keys(filteredToolsByCategory).length > 0 ? (
          Object.entries(filteredToolsByCategory).map(([category, toolsList]) => (
            <SidebarGroup
              key={category}
              title={category}
              tools={toolsList}
              isCollapsed={isCollapsed}
            />
          ))
        ) : (
          <div className="p-4 text-center text-xs text-[var(--kp-text-muted)]">
            No tools match &quot;{searchQuery}&quot;
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      {!isCollapsed ? (
        <div className="p-3 border-t border-[var(--kp-border-subtle)] bg-[var(--kp-bg-alt)]/50 text-[11px] text-[var(--kp-text-secondary)] space-y-2">
          <Link
            href="/docs"
            className="flex items-center justify-between p-2 rounded-md bg-orange-50 hover:bg-orange-100/80 border border-orange-200/80 text-orange-700 font-semibold transition-colors group"
          >
            <span className="flex items-center gap-1.5">
              <BookOpen size={13} className="text-orange-600" />
              <span>Documentation</span>
            </span>
            <span className="text-[10px] bg-orange-200/60 px-1.5 py-0.2 rounded font-mono text-orange-800">
              /docs
            </span>
          </Link>

          <Link
            href="/guides"
            className="flex items-center gap-1.5 p-2 rounded-md text-[var(--kp-text-secondary)] hover:bg-[var(--kp-surface)] hover:text-[var(--kp-text-primary)] font-semibold transition-colors"
          >
            <GraduationCap size={13} className="text-[var(--kp-text-secondary)]" />
            <span>How-To Guides</span>
          </Link>

          <div className="flex items-center justify-between text-[10px] font-medium text-[var(--kp-text-muted)] pt-2 border-t border-[var(--kp-border)]/50">
            <span className="pl-2">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      ) : (
        <div className="p-2 border-t border-[var(--kp-border-subtle)] flex justify-center">
          <Link
            href="/docs"
            className="p-2 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
            title="Documentation (/docs)"
          >
            <BookOpen size={18} />
          </Link>
        </div>
      )}
    </aside>
  );
}
