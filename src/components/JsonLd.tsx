export default function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Yaksen Creative Studio",
        "url": "https://yaksen.cloud",
        "logo": "https://yaksen.cloud/logo.svg",
        "sameAs": [
            "https://web.facebook.com/yaksen",
            "https://www.linkedin.com/company/yaksen"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+94-77-123-4567",
            "contactType": "customer service"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
