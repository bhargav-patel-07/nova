"use client"
import { useState } from "react";
import { Sidebar, SidebarBody } from "../../../../components/chat/Sidebar";

export default function ChatPage() {
  const [open, setOpen] = useState(true); // or false for closed

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar container */}
      <div className="relative h-screen" style={{ width: open ? 300 : 60 }}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody />
        </Sidebar>
        {/* Vertical divider line at the right edge of the sidebar - removed */}
      </div>
      {/* Main content */}
      <div className="flex-1 h-full">
        {/* Your main chat content here */}
      </div>
    </div>
  );
} 