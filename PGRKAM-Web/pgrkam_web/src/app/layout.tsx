"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import store from "../Store/Store";
import { Provider } from "react-redux";
import ToasterContext from "./context/ToastContext";
import { ThemeProvider } from "next-themes";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Provider store={store}>
        <body className={`dark:bg-black ${inter.className}`}>
          <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="light"
          >
            <ToasterContext />
            {children}
          </ThemeProvider>
        </body>
      </Provider>
    </html>
  );
}
