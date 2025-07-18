"use client";
import { useParams } from "next/navigation";
import ChatPage from "../../chatpage";

export default function ChatSessionPage() {
  const params = useParams();
  const { user, chatid } = params;

  return (
    <div className="h-screen w-full">
      <ChatPage />
    </div>
  );
}