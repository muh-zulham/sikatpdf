import Link from "next/link";
import { Check, X, Zap } from "lucide-react";

export const metadata = {
  title: "Harga SikatPDF — Free vs Pro",
  description: "Bandingkan paket Free dan Pro. Dapatkan akses tanpa batas, OCR, batch processing, dan fitur advanced lainnya.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--kp-bg)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-[var(--kp-text)] tracking-tight mb-4">
            Pilih Paket yang Tepat
          </h1>
          <p className="text-lg text-[var(--kp-text-secondary)] max-w-2xl mx-auto">
            SikatPDF gratis untuk kebutuhan sehari-hari. Upgrade ke Pro untuk fitur yang menghemat waktu dan menangani dokumen kompleks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="rounded-2xl border border-[var(--kp-border)] bg-[var(--kp-surface)] p-8 flex flex-col">
            <h2 className="text-xl font-bold text-[var(--kp-text)] mb-2">Free</h2>
            <p className="text-sm text-[var(--kp-text-muted)] mb-6">Untuk pekerjaan PDF sehari-hari.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-[var(--kp-text)]">Rp0</span>
              <span className="text-sm text-[var(--kp-text-muted)]"> / selamanya</span>
            </div>
            <ul className="space-y-3 text-sm text-[var(--kp-text-secondary)] mb-8 flex-1">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Merge PDF: maks 10 file/task</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Split PDF: 1 dokumen/task</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Compress Basic: 1 file/task</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> JPG to PDF: maks 10 gambar/task</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> PDF to Image: 1 dokumen/task</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Konversi format standar</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Privasi 100% lokal</li>
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Batas 3 file/hari</li>
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> Batch processing</li>
              <li className="flex items-center gap-2"><X className="w-4 h-4 text-red-400" /> OCR & Advanced Edit</li>
            </ul>
            <button className="w-full py-3 rounded-lg border border-[var(--kp-border)] text-sm font-semibold text-[var(--kp-text)] hover:bg-[var(--kp-bg-alt)] transition-colors">
              Paket Saat Ini
            </button>
          </div>

          {/* Pro Tier */}
          <div className="rounded-2xl border-2 border-[var(--kp-accent)] bg-[var(--kp-surface)] p-8 flex flex-col relative shadow-lg">
            <div className="absolute top-0 right-0 bg-[var(--kp-accent)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <h2 className="text-xl font-bold text-[var(--kp-text)] mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[var(--kp-accent)]" /> Pro
            </h2>
            <p className="text-sm text-[var(--kp-text-muted)] mb-6">Untuk profesional dan dokumen kompleks.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-[var(--kp-text)]">Rp19.000</span>
              <span className="text-sm text-[var(--kp-text-muted)]"> / bulan</span>
            </div>
            <ul className="space-y-3 text-sm text-[var(--kp-text-secondary)] mb-8 flex-1">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Semua</strong> fitur Free</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Unlimited processing jobs</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Batch processing</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Strong Compression</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> OCR & Advanced Conversion</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Advanced Editing & Security</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Strong Compression</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Prioritas support</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-[var(--kp-accent)] text-white text-sm font-semibold hover:bg-[var(--kp-accent-hover)] transition-colors">
              Upgrade ke Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
