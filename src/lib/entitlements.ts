// src/lib/entitlements.ts

export type UserTier = "free" | "pro";

export interface TierLimits {
  mergeFiles: number;
  splitDocs: number;
  compressFiles: number;
  imagesToPdf: number;
  batchProcessing: boolean;
  strongCompression: boolean;
  ocr: boolean;
}

export const TIER_LIMITS: Record<UserTier, TierLimits> = {
  free: {
    mergeFiles: 10,
    splitDocs: 1,
    compressFiles: 1,
    imagesToPdf: 10,
    batchProcessing: false,
    strongCompression: false,
    ocr: false,
  },
  pro: {
    mergeFiles: Infinity,
    splitDocs: Infinity,
    compressFiles: Infinity,
    imagesToPdf: Infinity,
    batchProcessing: true,
    strongCompression: true,
    ocr: true,
  },
};

export function getUserTier(): UserTier {
  // Sementara hardcode 'free'. Nanti diganti dengan validasi license key.
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("sikatpdf_tier");
    if (saved === "pro") return "pro";
  }
  return "free";
}

export function canUseFeature(feature: keyof TierLimits): boolean {
  const tier = getUserTier();
  const limit = TIER_LIMITS[tier][feature];
  if (typeof limit === "boolean") return limit;
  return limit > 0;
}
