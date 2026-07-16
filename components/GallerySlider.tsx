'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function GallerySlider({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative h-80 overflow-hidden rounded-2xl">
        <Image
          src={images[active]}
          alt={`Tour package gallery image ${active + 1}`}
          fill
          sizes="100vw"
          priority={active === 0}
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className={`relative h-20 overflow-hidden rounded-lg ${index === active ? 'ring-2 ring-brandBlue' : ''}`}
            aria-label={`View gallery image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`Tour package thumbnail ${index + 1}`}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
