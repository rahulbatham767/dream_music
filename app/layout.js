// app/layout.js
import ClientLayout from "./components/ClientLayout";

import "./globals.css";
import { Inter } from "next/font/google";
import Home from "./page";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Dream Music",
  description: "Listen to your favorite music",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full">
        <ClientLayout>
          <Home />
        </ClientLayout>
      </body>
    </html>
  );
}
