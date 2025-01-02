import Navbar from "@/components/global/Navbar";
import "./globals.css";

export const metadata = {
  title: "Neina | Book Tables",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
        {children}
        </body>
    </html>
  );
}
