'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function GallerySlider({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative h-80 overflow-hidden rounded-2xl">
        <Image src={images[active]} alt="Package view" fill className="object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button key={image} onClick={() => setActive(index)} className={`relative h-20 overflow-hidden rounded-lg ${index === active ? 'ring-2 ring-brandBlue' : ''}`}>
            <Image src={image} alt={`Slide ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
