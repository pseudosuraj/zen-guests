"use client";
import { useState } from "react";
export default function SignupPage() {
  const [hotelName, setHotelName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const fields = { hotelName, name, email, password };
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      setMessage(data?.success ? "Signup success! Go check your email." : (data?.error || "Signup failed."));
      // Helpful debug:
      console.log("Signup API reply:", data);
    } catch (e) {
      setMessage("Signup crashed or network error.");
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <form className="space-y-4 max-w-md w-full bg-white rounded shadow p-10" onSubmit={handleSignup}>
        <input required value={hotelName} onChange={e=>setHotelName(e.target.value)} placeholder="Hotel Name" className="w-full border p-2 rounded" />
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" className="w-full border p-2 rounded" />
        <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded" />
        <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-primary-violet text-white py-2 rounded">Sign Up</button>
        {message && <div className="text-center text-red-600 mt-2">{message}</div>}
      </form>
    </div>
  );
}
