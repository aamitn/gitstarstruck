// app/metadata.ts
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'; // Fallback to localhost if not set
const imageUrl = `${baseUrl}/og-image.png`; // Base URL for images

export const siteMetadata: Metadata = {
  title: {
    default: 'GitStarStruck',
    template: '%s | GitStarStruck', // Format title with the app's name for better branding
  },

  description:
    'GitStarStruck helps developers instantly boost their GitHub profiles with a unique StarStruck achievement, improving visibility and recognition in the developer community.',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.gitstarstruck.com', // Update with the actual URL
    siteName: 'GitStarStruck',
    title:
      'GitStarStruck | Instantly boost your github profile - Get StarStruck!',
    description:
      'Enhance your GitHub profile with the StarStruck achievement, and stand out in the developer community with instant recognition.',
    images: [
      {
        url: imageUrl, // Replace with the path to a relevant Open Graph image (e.g., a GitHub-related graphic)
        width: 1200,
        height: 630,
        alt: 'GitStarStruck - Instant GitHub Profile Enhancement',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@GitStarStruck', // Replace with the actual Twitter handle
    creator: '@GitStarStruck', // Replace with your Twitter handle
    title: 'GitStarStruck | Boost Your GitHub Profile Instantly',
    description:
      'Achieve instant recognition on GitHub by earning the StarStruck badge, boosting your profile’s credibility and visibility.',
    images: [imageUrl], // Replace with the path to a Twitter-specific image
  },

  robots: {
    index: true, // Allow indexing for SEO
    follow: true, // Allow crawling of links
    nocache: false, // Disable no-cache for better performance
  },

  icons: {
    icon: '/favicon.ico', // Replace with a specific app favicon
    apple: '/apple-touch-icon.png', // Replace with your app’s touch icon
    // Optional additional icon sizes for responsive behavior across devices
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-png',
        sizes: '57x57',
      },
    ],
  },

  verification: {
    google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE', // Replace with actual code
    // other services can be added here if needed
  },

  // canonical: 'https://www.gitstarstruck.com', // Uncomment and update the canonical URL
};
