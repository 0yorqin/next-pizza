import type { Metadata } from "next";
import Header from "@/components/shared/Header";

export const metadata: Metadata = {
  title: "Next Pizza",
  description: "Лучшая пицца в городе",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />

      {children}
      {modal}
    </main>
  );
}
