export default function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Yaksen Creative Studio",
        "url": "https://yaksen.cloud",
        "logo": "https://yaksen.cloud/logo.svg",
        "sameAs": [
            "https://www.facebook.com/yaksen.creative.studio",
            "https://www.linkedin.com/company/104118840"
        ],
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+94-77-699-3097",
                "contactType": "customer service"
            },
            {
                "@type": "ContactPoint",
                "telephone": "+94-37-226-2212",
                "contactType": "customer service"
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
