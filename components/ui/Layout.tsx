import { ReactNode } from "react";
import Navigation from "./Navigation";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
      <Navigation />
      {children}
    </main>
  );
}
