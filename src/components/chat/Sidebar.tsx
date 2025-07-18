"use client";
import { cn } from "../../lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX, IconMessage } from "@tabler/icons-react";
import { StarsBackground } from "../ui/stars-background";
import { useUser, UserButton, SignOutButton } from "@clerk/nextjs";
import { IconLogout } from '@tabler/icons-react';

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      {/* MobileSidebar will be rendered in main content, not here */}
    </>
  );
};

export const DesktopSidebar = ({
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  const { user } = useUser();
  console.log('Sidebar user:', user);
  return (
    <div className="relative h-full w-full">
      {/* Vertical divider line for desktop only, always visible, now on the right */}
      <div className="absolute top-[15px] bottom-[15px] right-0 h-auto w-[1px] bg-gray-400 z-50 hidden md:block" />
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden md:flex md:flex-col w-[300px] shrink-0 relative z-10 bg-transparent",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 30,
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {open ? (
          <div className="flex flex-col gap-4 mt-8 h-full">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 whitespace-nowrap">
              <IconMessage className="inline-block" size={22} />
              Previous chats
            </h2>
            {/* Map over last 7 chats here */}
            <div className="flex flex-col gap-2">
              <span className="text-white/80 text-sm italic">No chats yet</span>
            </div>
            <div className="flex-1" />
            {/* User info at the bottom */}
            {user && (
              <div className="flex flex-col items-start gap-1 p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={user.imageUrl}
                    alt="User profile"
                    className="w-8 h-8 rounded-full border border-gray-500"
                  />
                  <span className="text-white text-sm font-medium">
                    {user.username || user.fullName || user.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
                {/* Sign Out button below the profile info, with extra spacing */}
                <SignOutButton>
                  <button className="mt-12 flex items-center gap-4 text-white/80 hover:text-red-500 transition-colors">
                    <IconLogout size={20} />
                    {open && <span className="text-sm">Sign out</span>}
                  </button>
                </SignOutButton>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-end h-full pb-6 gap-6">
            {/* Only icons, vertically aligned at the bottom */}
            <IconMessage className="text-white" size={22} />
            {user && (
              <img
                src={user.imageUrl}
                alt="User profile"
                className="w-8 h-8 rounded-full border border-gray-500"
              />
            )}
            <SignOutButton>
              <button className="flex items-center justify-center text-white/80 hover:text-red-500 transition-colors">
                <IconLogout size={20} />
              </button>
            </SignOutButton>
          </div>
        )}
      </motion.div>
    </div>
  );
  
};

export const MobileSidebar = ({
  className,
  children,
  open,
  setOpen,
  ...props
}: React.ComponentProps<"div"> & { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { user } = useUser();
  return (
    <>
      <div
        className={cn(
          "px-4 py-4 flex flex-row md:hidden items-center w-full relative bg-transparent"
        )}
        {...props}
      >
        <StarsBackground className="!w-full !h-full !fixed !inset-0 !z-0" />
        {/* Menu button absolutely at top left */}
        <button
          className="fixed top-4 left-4 z-50 bg-transparent border-none p-0 m-0"
          style={{ lineHeight: 0 }}
          onClick={() => setOpen(!open)}
        >
          <IconMenu2 className="text-white" />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed inset-0 h-full w-full z-[100] flex flex-col justify-between bg-black/90",
                className
              )}
            >
              {/* Top section: previous chats heading with chat icon */}
              <div className="flex flex-col gap-4 mt-8 px-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <IconMessage className="text-white" size={22} />
                  Previous chats
                </h2>
                {/* TODO: Map over last 7 chats here */}
                <div className="flex flex-col gap-2">
                  {/* Example placeholder */}
                  <span className="text-white/80 text-sm italic">No chats yet</span>
                </div>
              </div>
              {/* Bottom section: profile and sign out */}
              {user && (
                <div className="w-full flex flex-col items-center gap-2 p-6 absolute bottom-0 left-0">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={user.imageUrl}
                      alt="User profile"
                      className="w-8 h-8 rounded-full border border-gray-500"
                    />
                    <span className="text-white text-sm font-medium">
                      {user.username || user.fullName || user.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                  <SignOutButton>
                    <button className="flex items-center gap-2 text-white/80 hover:text-red-500 transition-colors">
                      <IconLogout size={20} />
                      <span className="text-sm">Sign out</span>
                    </button>
                  </SignOutButton>
                </div>
              )}
              {/* Close button */}
              <div
                className="absolute right-10 top-10 z-50 text-white"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate } = useSidebar();
  return (
    <a
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2  group/sidebar py-2",
        className
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </a>
  );
};

