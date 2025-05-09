import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weather App | Pawa IT Solutions",
  description: "A modern weather application with real-time forecasts",
  keywords: "weather, forecast, temperature, humidity, wind speed, pawa it",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://openweathermap.org" />
      </head>
      <body className={`${comfortaa.variable} font-comfortaa bg-background text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}