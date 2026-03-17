'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="mb-3 w-80 rounded-2xl border border-blue-100 bg-white p-4 shadow-card">
          <p className="text-sm font-semibold text-brandBlue">Travel Support</p>
          <p className="mt-2 text-sm text-slate-600">Hi! Need help picking a package? Call +91 98765 43210.</p>
        </div>
      ) : null}
      <button onClick={() => setOpen(!open)} className="rounded-full bg-brandBlue p-4 text-white shadow-lg">
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
}
