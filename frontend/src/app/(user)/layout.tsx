import { Navbar } from "../../components/Navbar";
import { Toaster } from "../../components/ui/toaster";
import { ApolloWrapper } from "../../lib/apolloWrapper";
import "../../styles/globals.css";
import { AuthProvider } from "../prodivers/AuthProvider";
import { BagContextProvider } from "../context/bagContext";
import { CategoryContextProvider } from "../context/categoryContext";
import { inter } from "../ui/fonts";

export const metadata = {
  title: "Muy Guay",
  description: "Tienda de Belleza y Estilo",
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
            <CategoryContextProvider>
              <AuthProvider>
                <Navbar />
                <main>{children}</main>
                <Toaster />
              </AuthProvider>
            </CategoryContextProvider>
          </BagContextProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
