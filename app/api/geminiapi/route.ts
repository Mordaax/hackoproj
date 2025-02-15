import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Ensure this is in your .env.local
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // ✅ Check if message exists
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required and must be a string." }, { status: 400 });
    }

    // ✅ Corrected Request Body Format
    const requestBody = {
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
      generationConfig: {
        temperature: 0.7, // Controls randomness (0 = more deterministic, 1 = more creative)
        maxOutputTokens: 200, // Limits response length
      },
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const data = await response.json();

    // ✅ Handle valid responses
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, but I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
