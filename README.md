# SikatPDF

**Local-First, Privacy-First PDF Toolkit.**

SikatPDF is a fast, browser-based PDF toolkit that allows you to merge, split, compress, convert, edit, and secure PDF files entirely on your own device. No uploads, no sign-ups, no tracking.

## 🌟 Why SikatPDF?

- **100% Client-Side Processing:** Your files never leave your device. SikatPDF uses WebAssembly and modern browser APIs to process documents locally.
- **Zero Tracking:** We don't use Google Analytics, Microsoft Clarity, or any third-party trackers. Your privacy is absolute.
- **No Limits:** No daily task limits, no file size caps, and no forced watermarks on the free tier.
- **Installable PWA:** Install SikatPDF directly to your desktop or mobile home screen for offline access.

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **PDF Engine:** `pdf-lib`, `pdfjs-dist`, `qpdf-wasm`
- **PWA:** Custom Service Worker & Manifest

## 🚀 Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/muh-zulham/sikatpdf.git
cd sikatpdf

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open http://localhost:3000 in your browser.

## 📄 License & Attribution

SikatPDF is built upon the excellent open-source project **KissThePDF**, which is licensed under the **MIT License**.

You can view the original repository here:
👉 https://github.com/positiveabhii/kiss-the-pdf

All original code, UI, and branding modifications in this repository are also distributed under the **MIT License**. See the `LICENSE` file for more details.

The hosted version at `sikatpdf.com` may include proprietary commercial features.

---
*Built with ❤️ for privacy-conscious users.*

