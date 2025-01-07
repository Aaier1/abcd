import { Metadata } from 'next/types';
import WebsiteImages from "../../public/WebsiteImages.png"

interface MetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
}


export function constructMetadata({
  title = 'MU Notes - BSc CSIT Resources',
  description = 'A platform by Mid-West University BSc CSIT students for sharing notes and assignments.',
  keywords = ['BSc CSIT', 'Mid-West University', 'notes', 'assignments', 'study materials'],
  image = WebsiteImages.src,
}: MetadataProps = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'MU Notes Team' }],
    creator: 'MU Notes Team',
    metadataBase: new URL('https://munotes.vercel.app'),
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@munotes',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}
