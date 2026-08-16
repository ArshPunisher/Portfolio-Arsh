/**
 * Renders a schema.org graph as JSON-LD. Server component — the markup ships in
 * the initial HTML so crawlers see it without executing any JavaScript.
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
