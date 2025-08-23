import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";

export default function Provider({ children }: { children: React.ReactNode }) {

  return <SessionProvider><HeroUIProvider>{children}</HeroUIProvider></SessionProvider>;
}