import { AppProvider } from "@/components/AppContext";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/layout/Header";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "DesiDine: Flavorful Journeys on Your Plate!",
  description:
    "Discover a culinary adventure with DesiDine – your gateway to exquisite flavors from local food. Savor authentic dishes, seamless ordering, and a feast of regional delights. Order now for a taste of home!",
  // description: 'Explore [Page Name] on DesiDine, where [highlight unique aspect or content]. Immerse yourself in the rich tapestry of Bangladeshi and Indian cuisine. Order now and embark on a flavorful journey with our easy, reliable, and delicious food delivery service.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <TopBanner />
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2024 All rights reserved
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
