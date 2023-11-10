import { AdminNavBar } from "../../components/AdminNavBar";
import { Toaster } from "../../components/ui/toaster";
import { ApolloWrapper } from "../../lib/apolloWrapper";
import "../../styles/globals.css";
import { AuthProvider } from "../prodivers/AuthProvider";
import { inter } from "../ui/fonts";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans`}>
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
