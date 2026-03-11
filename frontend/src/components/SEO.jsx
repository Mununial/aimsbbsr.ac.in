import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = "Ayush Institute of Medical Sciences (AIMS) – Bhubaneswar";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = "AIMS Bhubaneswar – Leading Pharmacy College in Odisha offering B.Pharm and D.Pharm courses. PCI Approved, Modern Campus, 100% Placement Assistance.";
    const defaultKeywords = "Pharmacy College, B.Pharm, D.Pharm, AIMS Bhubaneswar, Medical Sciences Odisha, Pharmacy Admission 2026";
    const siteUrl = "https://aims-medical.com"; // Placeholder, update to real URL later
    const defaultImage = "https://i.ibb.co/8Ym8Y8G/aims-admission-banner.jpg";

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={`${siteUrl}${url || ''}`} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${siteUrl}${url || ''}`} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={`${siteUrl}${url || ''}`} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content={image || defaultImage} />

            {/* Additional Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="author" content="AIMS Bhubaneswar" />
        </Helmet>
    );
};

export default SEO;
