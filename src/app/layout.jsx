import "./globals.css";
import Providers from "./Providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export const metadata = {
  title: "EventHub",
  description: "Event management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* external CSS with precedence to silence Next warning */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          precedence="default"
        />
      </head>
      <body className="bg-[#050816] text-white">
        <Providers>
          <Navbar />
          {/* give space under fixed navbar */}
          <main className="pt-16 min-h-screen">{children}</main>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
