"use client";
import { cn } from "../../lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX, IconMessage } from "@tabler/icons-react";
import { StarsBackground } from "../ui/stars-background";

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
      <MobileSidebar />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
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
          <div className="flex flex-col gap-4 mt-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 whitespace-nowrap">
              <IconMessage className="inline-block" size={22} />
              Previous chats
            </h2>
            {/* Map over last 7 chats here */}
            <div className="flex flex-col gap-2">
              <span className="text-white/80 text-sm italic">No chats yet</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center mt-8 ml-1">
            <IconMessage className="text-white" size={22} />
          </div>
        )}
      </motion.div>
    </div>
  );
  
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between w-full relative bg-transparent"
        )}
        {...props}
      >
        <StarsBackground className="!w-full !h-full !fixed !inset-0 !z-0" />
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-white"
            onClick={() => setOpen(!open)}
          />
        </div>
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
                "fixed h-full w-full inset-0 p-10 z-[100] flex flex-col justify-between bg-transparent",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-white"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <h2 className="text-lg font-semibold text-white mb-4">Previous chats</h2>
                {/* TODO: Map over last 7 chats here */}
                <div className="flex flex-col gap-2">
                  {/* Example placeholder */}
                  <span className="text-white/80 text-sm italic">No chats yet</span>
                </div>
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

