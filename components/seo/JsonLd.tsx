type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown> | null | undefined>;
};

export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data.filter(Boolean) : data;

  if (Array.isArray(payload) && payload.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
