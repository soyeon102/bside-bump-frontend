import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./utils/provider";
import Script from "next/script";
import KakaoScript from "./utils/KakaoScript";

declare global {
  interface Window {
    Kakao: any;
  }
}

const suitVariable = localFont({
  src: "../fonts/SUIT-Variable.woff2",
  variable: "--font-suit",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${suitVariable.className} antialiased`}>
        <Providers>
          <div className="relative flex flex-col justify-center overflow-hidden bg-gray-100 min-h-inherit">
            <div className="absolute inset-0"></div>
            <main className="flex flex-col flex-1 min-h-inherit relative shadow-xl sm:mx-auto sm:w-layout bg-white">
              <Navbar />
              {children}
            </main>
          </div>
        </Providers>
      </body>
      <KakaoScript />
    </html>
  );
}
