import "./globals.css";
import { LazorkitProviderWrapper } from "@/providers/LazorKitProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LazorkitProviderWrapper>
          {children}
        </LazorkitProviderWrapper>
      </body>
    </html>
  );
}
