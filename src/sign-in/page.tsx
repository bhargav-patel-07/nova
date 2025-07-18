"use client";
import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { generateChatId } from "../components/generateChatId";

export default function SignUpPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      const username = user.username || user.id || user.primaryEmailAddress?.emailAddress;
      const chatid = generateChatId();
      console.log('Redirecting to:', `/chat/${username}/${chatid}`, { username, chatid });
      router.push(`/chat/${username}/${chatid}`);
    }
  }, [isSignedIn, user, router]);

  return <SignUp />;
}
