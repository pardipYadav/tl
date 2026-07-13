'use client';

import Link from 'next/link';
import { useState } from 'react';

interface BrandLogoProps {
  variant?: 'header' | 'footer';
  link?: boolean;
}

export default function BrandLogo({ variant = 'header', link = true }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);

  const image = (
    <img
      src="/logo.png"
      alt="Divine Simparna Pvt Ltd"
      onError={() => setImgError(true)}
      className={
        variant === 'footer'
          ? 'h-[100px] w-auto max-w-[380px] object-contain object-left sm:h-[110px] sm:max-w-[420px]'
          : 'h-[84px] w-auto max-w-[320px] object-contain sm:h-[100px] sm:max-w-[380px] lg:h-[110px] lg:max-w-[420px]'
      }
    />
  );

  const fallback = (
    <span className="font-heading text-2xl font-bold tracking-tight text-[#0B2548] sm:text-3xl">
      Divine <span className="text-[#C4A053]">Simparna</span>
    </span>
  );

  const content = (
    <span className="inline-flex items-center transition-opacity hover:opacity-90">{imgError ? fallback : image}</span>
  );

  if (!link) return content;
  return <Link href="/">{content}</Link>;
}
