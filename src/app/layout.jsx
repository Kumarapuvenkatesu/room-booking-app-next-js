
import "./globals.css";
import HeaderWrapper from "./headerWrapper";
import { SessionProvider } from "next-auth/react";
import { DatesProvider } from "./(auth-routes)/context/context";
export const metadata = {
  title: "Booking App",
  description: "Book a rooms in the hotel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DatesProvider>
          <SessionProvider>
        <HeaderWrapper/>
           {children}</SessionProvider>
           </DatesProvider>
        </body>
    </html>
  );
}
