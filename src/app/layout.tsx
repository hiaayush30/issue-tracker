import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import './theme-config.css';
import { ToastContainer } from "react-toastify"
import AuthProvider from "@/auth/Provider";
import QueryClientProvider from "@/QueryClientProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Track your project issues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider>
        <AuthProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
          >
            <Theme accentColor="iris">
              <NavBar />
              <main>
                <Container>
                  {children}
                </Container>
              </main>
              <ToastContainer />
            </Theme>
          </body>
        </AuthProvider>
      </QueryClientProvider>
    </html >
  );
}
