import Header from "../../components/Header";
import Image from "next/image";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="w-full flex items-center px-8 pt-2 z-10">
        <div className="logo-container flex-shrink-0 flex items-center">
          <Image
            src="/logo.png"
            alt="nova.ai logo"
            width={100}
            height={100}
            className="max-w-[100px] h-auto m-0 p-0"
            priority
          />
        </div>
        <Header />
      </div>
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">ChatGPT-like Chat Page</h1>
      </main>
    </div>
  );
} 