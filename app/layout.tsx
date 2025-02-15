import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Heng Ong Huat",
  description: "Fighting additiction at every step",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex flex-col min-h-screen w-full">
            <nav className="w-full flex justify-center border-b-foreground/10 h-16">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <Link href={"/"}>Home</Link>
                </div>
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
              </div>
            </nav>
            <nav className="w-full flex justify-center border-b-foreground/10 h-16 mb-5">
              <div className="flex gap-5 items-center font-semibold">
              <Link href={"/aichat"}>Get Tips</Link>
              <Link href={"/donation"}>Support Programmes</Link>
              <Link href={"/"}>Profile</Link>
              <Link href={"/donationhistory"}>Donation History</Link>
              <Link href={"/addictionhelp"}>Join Programmes</Link>
              </div>
            
            </nav>
            <div className="flex-1 w-full h-full flex flex-col items-center">
              {children}
            </div>

            <footer className="w-full flex items-center justify-center mx-auto text-center text-xs gap-8 py-16">
              <p>
                A {" "}
                <a
                  href="https://hackomania.geekshacking.com/"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Hackomania 2025 Project
                </a>
              </p>
              <ThemeSwitcher />
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
