"use client";

import { useRef, useState } from "react";
import { FileUp } from "lucide-react";

/**
 * Drag-and-drop / click-to-browse file picker for any file type and count.
 * (`PdfUploadArea` in features/pdf is single-PDF only.)
 *
 * Files that don't match `accept` are reported through `onRejected` rather
 * than silently dropped — a drop of the wrong kind of file must say so.
 */
export function FileDropZone({
  onFiles,
  onRejected,
  accept,
  multiple = false,
  title,
  subtitle,
  formatsLabel,
  disabled = false,
  compact = false,
}: {
  onFiles: (files: File[]) => void;
  onRejected?: (files: File[]) => void;
  /** Same syntax as <input accept>: "application/pdf,.pdf" or "image/*". */
  accept: string;
  multiple?: boolean;
  title: string;
  subtitle?: string;
  /** Footer line, e.g. "PDF · Local processing". */
  formatsLabel?: string;
  disabled?: boolean;
  /** Smaller variant for "add more files" under an existing list. */
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handle = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const files = Array.from(list).slice(0, multiple ? undefined : 1);
    const ok: File[] = [];
    const bad: File[] = [];
    for (const f of files) (matchesAccept(f, accept) ? ok : bad).push(f);
    if (bad.length) onRejected?.(bad);
    if (ok.length) onFiles(ok);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (!disabled) handle(e.dataTransfer.files);
      }}
      className={`relative w-full border border-dashed rounded-lg transition-all ${
        dragging
    ? "border-[var(--kp-accent)] bg-[var(--kp-accent-soft)]"
    : "border-[var(--kp-border)] bg-[var(--kp-bg-alt)] hover:bg-[var(--kp-surface)] hover:border-[var(--kp-accent-border)]"
      } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`group flex w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kp-accent)] rounded-lg ${
          compact ? "items-center justify-center gap-2 py-3 px-4" : "flex-col items-center justify-center py-10 px-6"
        }`}
      >
        {compact ? (
          <>
            <FileUp className="w-4 h-4 text-[var(--kp-text-secondary)]" aria-hidden="true" />
            <span className="text-xs font-semibold text-[var(--kp-text-primary)]">{title}</span>
          </>
        ) : (
          <>
            <div className="p-3 bg-[var(--kp-accent-soft)] border border-[var(--kp-accent-border)] rounded-md shadow-2xs text-[var(--kp-accent)] group-hover:text-[var(--kp-accent-hover)] group-hover:border-[var(--kp-accent)] transition-colors mb-3">
              <FileUp className="w-5 h-5" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-[var(--kp-text-primary)]">{title}</p>
            <p className="text-xs text-[var(--kp-text-secondary)] mt-1">
              {subtitle ?? `Drag and drop ${multiple ? "files" : "a file"} here, or click to browse`}
            </p>
            <span className="mt-4 px-3 py-1.5 bg-[var(--kp-surface)] border border-[var(--kp-border)] text-[var(--kp-text-secondary)] font-medium text-xs rounded-md group-hover:bg-[var(--kp-surface)]/80 shadow-2xs">
              {multiple ? "Choose files" : "Choose file"}
            </span>
            {formatsLabel && (
              <span className="text-[11px] text-[var(--kp-text-muted)] mt-3 font-mono">{formatsLabel}</span>
            )}
          </>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          handle(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/** Same matching rules the browser applies to <input accept>. */
export function matchesAccept(file: File, accept: string): boolean {
  const tokens = accept.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
  if (tokens.length === 0) return true;
  const name = file.name.toLowerCase();
  const type = (file.type || "").toLowerCase();
  return tokens.some((t) => {
    if (t.startsWith(".")) return name.endsWith(t);
    if (t.endsWith("/*")) return type.startsWith(t.slice(0, -1));
    return type === t;
  });
}
