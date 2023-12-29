import type { Metadata } from "next";
import "./globals.css";
import site from "@/config/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  keywords: site.keywords,
  authors: {
    name: site.name,
    url: site.url,
  },
  creator: site.name,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
