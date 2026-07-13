'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="mb-3 w-80 rounded-2xl border border-[#e8e0d0] bg-white p-4 shadow-card">
          <p className="text-sm font-semibold text-brandNavy">Travel Support</p>
          <p className="mt-2 text-sm text-slate-600">Hi! Need help picking a package? Call +91 82848 79420.</p>
        </div>
      ) : null}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open travel support chat"
        className="rounded-full bg-brandNavy p-4 text-white shadow-lg transition hover:bg-[#16396a]"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
}
