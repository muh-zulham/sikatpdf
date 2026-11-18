// src/components/ui/free-limit-banner.tsx
"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

export function FreeLimitBanner({ limit, current }: { limit: number; current: number }) {
  if (current < limit) return null;
  return (
    <div className="mb-4 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-amber-600" />
        <span>Free tier limit reached ({limit} files). Upgrade to Pro for batch processing.</span>
      </div>
      <Link href="/pricing" className="font-semibold text-amber-900 hover:underline">
        Upgrade
      </Link>
    </div>
  );
}
