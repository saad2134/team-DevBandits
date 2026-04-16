"use client";

import { ReactNode } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function PageWrapper({ children, title, subtitle }: PageWrapperProps) {
  return (
    <DashboardLayout title={title} subtitle={subtitle}>
      {children}
    </DashboardLayout>
  );
}
