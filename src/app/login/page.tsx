"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader"; 

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loader

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/call"); // Redirect on success
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      console.log(error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-950">
      <div className="border-gradient p-1 rounded-lg">
        <div className="bg-gray-950 rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-center text-white mb-4">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                className="w-full p-2 mt-1 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading} // Disable while loading
              className={`w-full py-2 rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold hover:opacity-90 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? <Loader /> : "Log In"}
            </button>
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
