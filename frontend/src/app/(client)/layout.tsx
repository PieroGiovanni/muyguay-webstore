import { Navbar } from "../../components/Navbar";
import { ApolloWrapper } from "../../lib/apolloWrapper";
import { BagContextProvider } from "../context/bagContext";
import { CategoryContextProvider } from "../context/categoryContext";
import { AuthProvider } from "../prodivers/AuthProvider";
import "../../styles/globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://rsms.me/inter/inter.css"
          as="style"
        />
      </head>
      <body className="font-sans">
        <ApolloWrapper>
          <BagContextProvider>
            <CategoryContextProvider>
              <AuthProvider>
                <Navbar />
                <main>{children}</main>
              </AuthProvider>
            </CategoryContextProvider>
          </BagContextProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}