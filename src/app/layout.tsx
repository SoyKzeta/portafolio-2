import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/michroma/400.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "EV Solar Portfolio",
  description:
    "Portafolio sci-fi inmersivo con navegación orbital, proyectos full stack y una experiencia cinematográfica en 3D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
