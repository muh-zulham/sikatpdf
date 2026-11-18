// src/components/ui/upgrade-modal.tsx
"use client";

import Link from "next/link";
import { Zap, X } from "lucide-react";

export function UpgradeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-xl bg-[var(--kp-surface)] p-6 shadow-xl border border-[var(--kp-border)]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-md text-[var(--kp-text-muted)] hover:bg-[var(--kp-bg-alt)] hover:text-[var(--kp-text)]"
        >
          <X size={18} />
        </button>
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--kp-accent-soft)] text-[var(--kp-accent)]">
            <Zap size={24} />
          </div>
          <h2 className="text-xl font-bold text-[var(--kp-text-primary)]">Upgrade to Pro</h2>
          <p className="text-sm text-[var(--kp-text-secondary)]">
            You have reached the free tier limit. Upgrade to Pro to unlock unlimited batch processing.
          </p>
          <Link
            href="/pricing"
            className="inline-block w-full rounded-lg bg-[var(--kp-accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--kp-accent-hover)] transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
