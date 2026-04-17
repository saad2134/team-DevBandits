"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SavedProvider } from "@/context/SavedContext";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <SavedProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </SavedProvider>
  );
}