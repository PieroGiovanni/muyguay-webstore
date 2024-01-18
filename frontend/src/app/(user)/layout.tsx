import { Navbar } from "../../components/Navbar";
import { Toaster } from "../../components/ui/toaster";
import { ApolloWrapper } from "../../lib/apolloWrapper";
import "../../styles/globals.css";
import { AuthProvider } from "../prodivers/AuthProvider";
import { BagContextProvider } from "../context/bagContext";
import { inter } from "../ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://muyguay.shop"),
  title: "Muy Guay",
  description: "Tienda de Belleza y Estilo",
  appLinks: {},
  openGraph: {
    title: "Muy Guay",
    description: "Tienda de Belleza y Estilo",
    url: "https://muyguay.shop",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans`}>
        <ApolloWrapper>
          <BagContextProvider>
            <AuthProvider>
              <Navbar />
              <main>{children}</main>
              <Toaster />
            </AuthProvider>
          </BagContextProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
