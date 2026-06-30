import "./globals.css";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const getMetadataBase = () => {
    if (process.env.NEXT_PUBLIC_APP_URL) {
      return new URL(process.env.NEXT_PUBLIC_APP_URL);
    }
    if (process.env.VERCEL_URL) {
      return new URL(`https://${process.env.VERCEL_URL}`);
    }
    return new URL('http://localhost:3000');
};
  
export const metadata = {
    metadataBase: getMetadataBase(),
    title: "Aroma Vibe — Awaken The Vibe Within",
    description: "Find the fragrance that matches your vibe.",
    image: '/og.webp',
    applicationName: 'Aroma Vibe',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Aroma Vibe',
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: 'website',
      siteName: 'Aroma Vibe',
      title: 'Aroma Vibe — Awaken The Vibe Within',
      description: 'Find the fragrance that matches your vibe.',
      images: '/og.webp'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Aroma Vibe — Awaken The Vibe Within',
      description: 'Find the fragrance that matches your vibe.',
      images: ['/og.webp'],
    },
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/icons/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icons/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' }
      ],
      apple: [
        { url: '/icons/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' }
      ]
    }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
      <Analytics/>
    </html>
  );
}
