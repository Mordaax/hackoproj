"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize"; // ✅ Prevents XSS attacks
import "highlight.js/styles/github.css"; // Adds syntax highlighting for code blocks

const ReplyRenderer = ({ reply }: { reply: string }) => {
  if (!reply) {
    return <p className="text-gray-500 italic">No response available.</p>; // ✅ Handles empty replies
  }

  return (
    <div className="p-4 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeHighlight, rehypeSanitize]} // ✅ Adds security
        components={{
          code({ node, inline, className, children, ...props }) {
            return inline ? (
              <code className="bg-gray-200 dark:bg-gray-700 rounded px-1">{children}</code>
            ) : (
              <pre className="overflow-x-auto p-2 bg-gray-900 text-white rounded">
                <code {...props} className={className}>
                  {children}
                </code>
              </pre>
            );
          }
        }}
      >
        {reply}
      </ReactMarkdown>
    </div>
  );
};

export default ReplyRenderer;
