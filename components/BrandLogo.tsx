'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BrandLogoProps {
  compact?: boolean;
}

export default function BrandLogo({ compact = false }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7396/ingest/007e1c08-2efe-483f-aa9f-ec04fc4bd93f', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': 'ce35a8'
      },
      body: JSON.stringify({
        sessionId: 'ce35a8',
        runId: 'pre-fix-BrandLogo',
        hypothesisId: 'H1',
        location: 'components/BrandLogo.tsx:render',
        message: 'BrandLogo rendered (no anchor)',
        data: { compact },
        timestamp: Date.now()
      })
    }).catch(() => {});
  }, [compact]);
  // #endregion

  const image = (
  <Link href="/">
    <img
      src="/logo.png"
      alt="Divine Simparna Holidays"
      onError={() => setImgError(true)}
      className={
        compact
          ? "h-19 w-auto max-w-[280px] object-contain cursor-pointer"
          : "h-20 w-auto max-w-[360px] object-contain cursor-pointer"
      }
    />
  </Link>
);

  const fallback = (
    <span className={compact ? 'text-base font-semibold text-brandBlue' : 'text-lg font-semibold text-brandBlue'}>
      Divine <span className="text-brandOrange">Simparna</span>
    </span>
  );

  return imgError ? fallback : image;
}
