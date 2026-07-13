import Image from 'next/image';
import Link from 'next/link';

interface Props {
  name: string;
  slug: string;
  image: string;
  country: string;
}

export default function DestinationCard({ name, slug, image, country }: Props) {
  return (
    <Link href={`/destinations/${slug}`} className="group relative h-72 overflow-hidden rounded-2xl shadow-card">
      <Image src={image} alt={name} fill className="object-cover transition duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-brandNavy/85 via-brandNavy/25 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-heading text-2xl font-bold text-white">{name}</h3>
        <p className="text-sm text-brandGold">{country}</p>
      </div>
    </Link>
  );
}
