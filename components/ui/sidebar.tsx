'use client';

import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Lazy-load Sheet components to prevent SSR errors
const Sheet = dynamic(() => import("@/components/ui/sheet").then(mod => mod.Sheet), { ssr: false });
const SheetContent = dynamic(() => import("@/components/ui/sheet").then(mod => mod.SheetContent), { ssr: false });
const SheetHeader = dynamic(() => import("@/components/ui/sheet").then(mod => mod.SheetHeader), { ssr: false });
const SheetTitle = dynamic(() => import("@/components/ui/sheet").then(mod => mod.SheetTitle), { ssr: false });
const SheetDescription = dynamic(() => import("@/components/ui/sheet").then(mod => mod.SheetDescription), { ssr: false });

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "14rem";

type SidebarContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  state: "expanded" | "collapsed";
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
}

export function SidebarProvider({
  defaultOpen = true,
  children,
}: {
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false); // client-only flag

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mark as mounted (client-only)
  useEffect(() => setMounted(true), []);

  // Update cookie only on client
  useEffect(() => {
    if (mounted) {
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open ? "expanded" : "collapsed"}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }
  }, [mounted, open]);

  const value: SidebarContextType = React.useMemo(
    () => ({
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      state: (open ? "expanded" : "collapsed") as "expanded" | "collapsed",
    }),
    [open, openMobile, isMobile]
  );

  if (!mounted) return null; // avoid SSR render

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function SidebarTrigger() {
  const { open, setOpen } = useSidebar();
  return (
    <button
      onClick={() => setOpen(!open)}
      className="fixed left-4 top-4 z-50 rounded-md border bg-background p-2 text-foreground shadow-sm md:hidden"
    >
      ☰
    </button>
  );
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen flex-1 flex-col md:pl-[--sidebar-width]">{children}</div>;
}

// Main Sidebar
export function Sidebar({
  side = "left",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile, open } = useSidebar();

  // MOBILE SIDEBAR
  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  // DESKTOP SIDEBAR
  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn("bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col", className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-side={side}
      data-slot="sidebar"
    >
      <div data-slot="sidebar-gap" className="relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear" />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          className
        )}
        {...props}
      >
        <div data-sidebar="sidebar" data-slot="sidebar-inner" className="bg-sidebar flex h-full w-full flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
