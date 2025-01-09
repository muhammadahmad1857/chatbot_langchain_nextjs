import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import Header from "@/sections/Header";
import Footer from "../sections/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import "./globals.css";

const soraFont = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: "variable",
});
const spaceGroteskFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: "variable",
});

export const metadata: Metadata = {
  title: "AI projects web || Every AI solution you need",
  description: "Created by Kognifi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${soraFont.variable} ${spaceGroteskFont.variable} overflow-x-hidden max-w-[100vw] antialiased bg-gray-950 text-gray-300 font-body`}
      >
        <Header />

        {children}
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          className={"px-5 py-3"}
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
