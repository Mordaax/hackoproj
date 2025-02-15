import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sendingWalletAddressUrl, email, amount,displayName } = await req.json();
    if (!sendingWalletAddressUrl || !email || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const response = await fetch("http://localhost:3002/send-money", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sendingWalletAddressUrl, email, amount, displayName}),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error || "Failed to send money" }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
