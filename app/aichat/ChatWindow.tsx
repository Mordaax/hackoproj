"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // ✅ Optional syntax highlighting

export default function ChatWindow({ userAgent }: { userAgent: string }) {
  const [messages, setMessages] = useState([
    { text: "Hello! Feel Free to ask any questions about addictions?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); 

  const sendMessage = async () => {
    if (!input.trim() || loading) return; 

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { text: "Thinking...", sender: "ai", isLoading: true },
    ]);

    try {
      const response = await fetch("/api/geminiapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      // Replace "Thinking..." with actual response
      setMessages((prev) =>
        prev.map((msg:any) =>
          msg.isLoading
            ? {
                text: data.reply || "I couldn't generate a response.",
                sender: "ai",
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) =>
        prev.map((msg:any) =>
          msg.isLoading
            ? { text: "Error fetching response.", sender: "ai" }
            : msg
        )
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // ✅ Handle "Enter" key press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents new line
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        User-Agent: {userAgent}
      </p>

      <div className="flex flex-col space-y-2 h-80 overflow-y-auto p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "ml-auto bg-green-500 text-white"
                : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
            }`}
          >
            {msg.text === "Thinking..." ? (
              <span className="animate-pulse">Thinking...</span> // ✅ Animated loading text
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {msg.text}
              </ReactMarkdown>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Input
          className={`flex-grow p-2 rounded-lg border border-gray-300 dark:border-gray-600 transition-opacity ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // ✅ Listen for "Enter" key
          placeholder="Type a message..."
          disabled={loading} // ✅ Disable input when loading
        />
        <Button
          onClick={sendMessage}
          className="p-2 bg-green-600 hover:bg-green-500 rounded-lg"
          disabled={loading} // ✅ Disable button when loading
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
}
