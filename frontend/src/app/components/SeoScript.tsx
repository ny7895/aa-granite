export default function SeoScript() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Double A Granite",
    image: "https://aa-granite.s3.us-east-1.amazonaws.com/dramatic-slabs.png",
    "@id": "https://doubleagranite.com",
    url: "https://doubleagranite.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2339 Second St SW",
      addressLocality: "Albuquerque",
      addressRegion: "NM",
      postalCode: "87102",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.058685,
      longitude: -106.653526,
    },
    telephone: "+15052679060",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
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
