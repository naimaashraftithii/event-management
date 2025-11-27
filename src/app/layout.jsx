// src/app/layout.jsx
import "./globals.css";
import Providers from "./Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- SITE METADATA (with favicon/logo) ---
export const metadata = {
  title: "EventHub",
  description: "Event management platform",
  icons: {
    icon: "/img/microphone.png", // favicon/logo shown in browser tab
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* External Font Awesome CSS (with precedence fix) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          precedence="default"
        />
      </head>

      <body className="bg-[#050816] text-white">
        <Providers>
          {/* Global Navbar */}
          <Navbar />

          {/* Page Body */}
          <main className="pt-16 min-h-screen">{children}</main>

          {/* Global Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
