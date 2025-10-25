import "./globals.css";
import { Poppins } from "next/font/google";

export const metadata = {
  title: "Chang'e",
  description: "Bridging the information gap for every trader.",
};

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-black text-white ${poppins.className}`}>{children}</body>
    </html>
  );
}