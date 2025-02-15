import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import _bgSnow from "../../public/bg-snow.svg";

import type { StaticImageData } from "next/image";

const bgSnow = _bgSnow as StaticImageData;

export default async function AIChatPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main
      className="flex w-full h-screen flex-col items-center bg-[#FBFFE4] dark:bg-[#3D8D7A] text-white"
      style={{ backgroundImage: `url(${bgSnow.src})` }}
    >
      <div className="container flex grow flex-col gap-10 px-4 py-16 max-w-2xl">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-white">
          AI Chat Interface
        </h1>
        <ChatWindow />
      </div>
    </main>
  );
}

function ChatWindow() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // Simulating AI response (replace with actual API call)
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "I'm just a demo!", sender: "ai" }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
      <div className="flex flex-col space-y-2 h-80 overflow-y-auto p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${msg.sender === "user" ? "ml-auto bg-green-500" : "bg-gray-300 dark:bg-gray-700"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Input
          className="flex-grow p-2 rounded-lg border border-gray-300 dark:border-gray-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <Button onClick={sendMessage} className="p-2 bg-green-600 hover:bg-green-500 rounded-lg">
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
}
