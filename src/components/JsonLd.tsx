export default function JsonLd() {
    const organization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Yaksen Creative Studio",
        "url": "https://yaksen.cloud",
        "logo": "https://yaksen.cloud/logo.svg",
        "description": "Sri Lanka's AI-First Digital Agency. We build AI-powered websites, brands, and marketing systems.",
        "sameAs": [
            "https://www.facebook.com/yaksen.creative.studio",
            "https://www.linkedin.com/company/104118840"
        ],
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+94-77-699-3097",
                "contactType": "sales",
                "availableLanguage": ["English", "Sinhala"]
            },
            {
                "@type": "ContactPoint",
                "telephone": "+94-37-226-2212",
                "contactType": "customer service",
                "availableLanguage": ["English", "Sinhala"]
            }
        ]
    };

    const localBusiness = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Yaksen Creative Studio",
        "url": "https://yaksen.cloud",
        "logo": "https://yaksen.cloud/logo.svg",
        "image": "https://yaksen.cloud/logo.svg",
        "description": "AI-powered web design, branding, and digital marketing agency in Kurunegala, Sri Lanka.",
        "telephone": "+94-77-699-3097",
        "email": "hello@yaksen.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kurunegala",
            "addressRegion": "North Western Province",
            "addressCountry": "LK"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "7.4867",
            "longitude": "80.3647"
        },
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/yaksen.creative.studio",
            "https://www.linkedin.com/company/104118840"
        ],
        "areaServed": {
            "@type": "Country",
            "name": "Sri Lanka"
        },
        "knowsAbout": [
            "Web Design",
            "Web Development",
            "Brand Identity",
            "Digital Marketing",
            "AI Solutions",
            "Social Media Marketing",
            "Next.js Development",
            "SEO"
        ]
    };

    const faqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How long does it take to build a website in Sri Lanka?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A simple website can be launched in 2-4 weeks, while custom software systems require 6-12 weeks for development. We provide a clear timeline before starting and ensure we deliver on schedule."
                }
            },
            {
                "@type": "Question",
                "name": "How much does a website cost in Sri Lanka?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Pricing varies based on your specific requirements and features. We offer flexible solutions tailored to different budget levels — from startups to established enterprises. Contact us for a custom proposal that meets your needs."
                }
            },
            {
                "@type": "Question",
                "name": "Can you guarantee the speed and quality of the website?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We utilize modern, high-performance technologies like Next.js to ensure your website loads fast, is fully mobile-responsive, and secure. We also include essential SEO optimizations to help your site rank better on Google."
                }
            },
            {
                "@type": "Question",
                "name": "Do you provide support after the website is launched?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we believe in long-term partnerships. We provide a period of free technical support immediately after launch. Following that, we offer comprehensive Annual Maintenance packages to handle updates, security, and backups."
                }
            },
            {
                "@type": "Question",
                "name": "How can AI technology benefit my business?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AI can significantly boost your efficiency. From integrating AI Chatbots that handle customer inquiries 24/7 to using AI tools for rapid content generation, we implement solutions that save you time and operational costs."
                }
            },
            {
                "@type": "Question",
                "name": "Do you handle domain names and web hosting?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we handle the entire technical setup. We can register your domain name and set up secure, high-speed web hosting for you, so you don't have to worry about the technical details."
                }
            },
            {
                "@type": "Question",
                "name": "Can I update the website content myself?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Definitely. We build websites with user-friendly administration panels (CMS). You will have full control to update text, images, and products easily without needing any coding knowledge. We also provide training."
                }
            },
            {
                "@type": "Question",
                "name": "What is included in your branding services?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our branding services include logo design, visual style definition (colors, typography), and creating a cohesive brand image that builds trust and recognition with your customers."
                }
            },
            {
                "@type": "Question",
                "name": "How do your social media and ads services help increase sales?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We create strategic ad campaigns on platforms like Facebook, Instagram, and Google to target your ideal audience. Our goal is to drive high-quality traffic to your business and convert viewers into paying customers."
                }
            },
            {
                "@type": "Question",
                "name": "Can you build custom software systems tailored to my needs?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Whether you need an inventory system, a CRM, or a booking platform, we specialize in developing custom software solutions. We analyze your business operations and build systems that automate tasks and solve your specific challenges."
                }
            }
        ]
    };

    const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Yaksen Creative Studio",
        "url": "https://yaksen.cloud",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://yaksen.cloud/en?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
            />
        </>
    );
}
