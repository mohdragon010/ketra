import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import ThemeProvider from "./ThemeProvider";
import Navbar from "./components/Navbar";
import "./globals.css";
import { SubjectsProvider } from "./contexts/subjectContexts";
import { NotesProvider } from "./contexts/notesContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://ketra.vercel.app'),
  title: {
    default: "Ketra – Smart Study Dashboard for Students",
    template: "%s | Ketra"
  },
  description:
    "Ketra is a modern web app that helps students stay organized, manage tasks, track progress, and study smarter with a clean dashboard interface.",
  keywords: [
    "ketra",
    "study dashboard",
    "ketra app",
    "mohamed ayman",
    "study app",
    "student dashboard",
    "study planner",
    "productivity tool for students",
    "websites for studying",
    "organize homework",
    "school management app",
    "learning planner",
    "study schedule maker",
    "education dashboard",
    "task management",
    "note taking app",
    "student productivity",
    "study organizer",
  ],
  authors: [{ name: "Mohammed Ayman", url: "https://ketra.vercel.app" }],
  creator: "Mohammed Ayman",
  publisher: "Ketra",
  applicationName: "Ketra",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Ketra – Smart Study Dashboard for Students",
    description:
      "Stay organized, track your tasks, and boost your productivity with Ketra — a clean and modern study dashboard built for students.",
    url: "https://ketra.vercel.app",
    siteName: "Ketra",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ketra – Smart Study Dashboard",
    description:
      "A productivity and study management platform designed to help students stay focused and organized.",
    creator: "Mohamed Ayman",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3B82F6' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0e14' },
  ],
  manifest: "/manifest.json",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'googleb528beef8c428dfd',
  },
  category: 'education',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="antialiased" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <SubjectsProvider>
          <NotesProvider>
            <ThemeProvider>
              <Navbar />
              <main style={{ flex: 1 }}>
                {children}
              </main>
            </ThemeProvider>
          </NotesProvider>
        </SubjectsProvider>
        <Analytics />
      </body>
    </html>
  );
}
