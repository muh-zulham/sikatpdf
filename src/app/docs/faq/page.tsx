import type { Metadata } from "next";
import { HelpCircle, CheckCircle2 } from "lucide-react";
import { DocsToc } from "@/components/docs/docs-toc";
import { DocsCTA } from "@/components/docs/docs-cta";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ)",
  description: "Answers to common questions about SikatPDF tools, local processing, privacy, supported browsers, offline usage, and open-source licensing.",
};

const headings = [
  { id: "is-it-free", text: "Is SikatPDF free?", level: 2 },
  { id: "are-files-uploaded", text: "Are my PDFs uploaded to a server?", level: 2 },
  { id: "account-required", text: "Do I need an account to use SikatPDF?", level: 2 },
  { id: "supported-browsers", text: "Which browsers are supported?", level: 2 },
  { id: "offline-usage", text: "Can I use SikatPDF offline?", level: 2 },
  { id: "open-source", text: "Is SikatPDF open source?", level: 2 },
  { id: "how-to-contribute", text: "How can I contribute?", level: 2 },
];

export default function FAQDocPage() {
  const faqs = [
    {
      id: "is-it-free",
      question: "Is SikatPDF free?",
      answer:
        "Yes, 100% free! There are no subscription tiers, hidden fees, premium paywalls, or daily file processing limits. Every tool is freely accessible to everyone.",
    },
    {
      id: "are-files-uploaded",
      question: "Are my PDFs uploaded to a server?",
      answer:
        "No. SikatPDF processes documents 100% locally inside your web browser via JavaScript and WebAssembly. Your files never leave your device.",
    },
    {
      id: "account-required",
      question: "Do I need an account to use SikatPDF?",
      answer:
        "No. There is no user registration, sign-up form, or login required. Simply navigate to any tool and process your documents immediately.",
    },
    {
      id: "supported-browsers",
      question: "Which browsers are supported?",
      answer:
        "All modern web browsers supporting WebAssembly and HTML5 File API are supported, including Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, Brave, and Opera on Desktop, Tablet, and Mobile devices.",
    },
    {
      id: "offline-usage",
      question: "Can I use SikatPDF offline?",
      answer:
        "Yes! Because all PDF processing libraries are downloaded with the application bundle, once the page is loaded (or cached), you can disconnect from the internet or use Airplane Mode to process your files completely offline.",
    },
    {
      id: "open-source",
      question: "Is SikatPDF open source?",
      answer: `Yes! SikatPDF is licensed under the OSI-approved MIT License. The complete codebase is publicly hosted on GitHub at ${siteConfig.githubUrl}.`,
    },
    {
      id: "how-to-contribute",
      question: "How can I contribute?",
      answer:
        "SikatPDF is a proprietary, commercially-supported product. We do not accept public code contributions at this time, but we welcome your feedback and feature requests through our official support channels.",
    },
  ];

  return (
    <div className="flex gap-10">
      <div className="flex-1 min-w-0 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            Find answers to common questions about SikatPDF features, privacy guarantees, supported browsers, and open-source contributions.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq) => (
            <section key={faq.id} id={faq.id} className="space-y-2 pt-4 border-t border-slate-200">
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <HelpCircle size={16} className="text-orange-500 shrink-0" />
                <span>{faq.question}</span>
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed pl-6">
                {faq.answer}
              </p>
            </section>
          ))}
        </div>

        <DocsCTA />
      </div>

      <DocsToc headings={headings} />
    </div>
  );
}
