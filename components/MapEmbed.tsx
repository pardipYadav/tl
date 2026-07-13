export default function MapEmbed({ lat, lng }: { lat: number; lng: number }) {
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=8&output=embed`;
  return <iframe title="Travel map" src={src} className="h-80 w-full rounded-2xl border border-[#e8e0d0]" loading="lazy" />;
}
