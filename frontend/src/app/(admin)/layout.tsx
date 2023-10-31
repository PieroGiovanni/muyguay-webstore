import { AdminNavBar } from "../../components/AdminNavBar";
import { Toaster } from "../../components/ui/toaster";
import { ApolloWrapper } from "../../lib/apolloWrapper";
import "../../styles/globals.css";
import { AuthProvider } from "../prodivers/AuthProvider";

export default function AdminLayout({
  children, // will be a page or nested layout
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
          <AuthProvider>
            <AdminNavBar />
            <main>{children}</main>
            <Toaster />
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
