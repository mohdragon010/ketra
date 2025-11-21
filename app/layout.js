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
  title: "Ketra – Smart Study Dashboard for Students",
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
  ],
  authors: [{ name: "Mohammed Ayman" }],
  creator: "Mohammed Ayman",
  publisher: "Ketra",
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
    creator: "@ketra",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  themeColor: "#3B82F6",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <SubjectsProvider>
          <NotesProvider>
            <ThemeProvider>
              <Navbar />
              {children}
            </ThemeProvider>
          </NotesProvider>
        </SubjectsProvider>
        <Analytics />
      </body>
    </html>
  );
}
