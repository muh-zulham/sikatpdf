// src/hooks/use-tool-limit.ts
"use client";

import { useState, useCallback } from "react";
import { getToolLimit } from "@/lib/entitlements";

export function useToolLimit(tool: "mergeFiles" | "splitDocs" | "compressFiles" | "imagesToPdf") {
  const limit = getToolLimit(tool);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const checkLimit = useCallback(
    (currentCount: number, incomingCount: number): { allowed: number; rejected: number } => {
      const total = currentCount + incomingCount;
      if (total <= limit) return { allowed: incomingCount, rejected: 0 };

      const allowed = Math.max(0, limit - currentCount);
      const rejected = incomingCount - allowed;
      if (rejected > 0) setShowUpgradeModal(true);
      return { allowed, rejected };
    },
    [limit]
  );

  return {
    limit,
    showUpgradeModal,
    setShowUpgradeModal,
    checkLimit,
  };
}
