import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ContextMenu from "@/components/ContextMenu";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientSound from "@/components/AmbientSound";
import { ExperienceProvider } from "@/components/ExperienceProvider";
import { buildMetadata } from "@/lib/seo";
import { personal } from "@/lib/data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = buildMetadata("home");

export const viewport = {
  themeColor: "#F5F1EB",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="relative bg-cream text-ink antialiased overflow-x-hidden">
        <ExperienceProvider>
          <CustomCursor />
          <ContextMenu />
          <ScrollProgress />
          <AmbientSound />
          <div className="relative z-10 flex min-h-[100svh] flex-col pb-[var(--bottom-nav-h)] lg:pb-0">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <BottomNav />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 bg-soft-radial"
          />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 bg-luxury-fade opacity-70"
          />
        </ExperienceProvider>
      </body>
    </html>
  );
}
