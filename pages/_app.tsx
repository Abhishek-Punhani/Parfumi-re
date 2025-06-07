import { ThemeProvider } from "@/contexts/themeProvider";
import { ToastProvider } from "@/contexts/toast/toast";
import { CartProvider } from "@/contexts/useCart";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component,   pageProps: { session, ...pageProps },
 }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <ToastProvider>
          <CartProvider>
          <Component {...pageProps} />
          </CartProvider>
        </ToastProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
