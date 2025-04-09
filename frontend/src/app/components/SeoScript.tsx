export default function SeoScript() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Double A Granite",
    image: "https://aa-granite.s3.us-east-1.amazonaws.com/dramatic-slabs.png",
    "@id": "https://doubleagranite.com",
    url: "https://doubleagranite.com",
    telephone: "+15058182430",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
