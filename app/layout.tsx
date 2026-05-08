import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZeroTrace Academy",
  description: "Professional ethical cybersecurity training platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
