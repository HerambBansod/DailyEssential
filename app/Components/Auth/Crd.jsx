"use client";
import React, { useState } from "react";

export default function AuthCard() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0b0b] relative overflow-hidden px-4 sm:px-6">

      <div className="absolute -top-20 -left-20 w-52 sm:w-72 h-52 sm:h-72 bg-violet-600/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-52 sm:w-72 h-52 sm:h-72 bg-violet-500/10 blur-3xl rounded-full" />

      <div className="w-full max-w-sm sm:max-w-md bg-[#0f0f0f] border border-white/[0.07] rounded-2xl p-4 sm:p-6 shadow-2xl relative z-10">

        <div className="flex justify-between items-center mb-5 sm:mb-6">
          <h1 className="text-white text-base sm:text-lg font-semibold tracking-tight">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <span className="text-[9px] sm:text-[10px] text-violet-400 bg-violet-500/10 border border-violet-500/25 px-2 py-1 rounded">
            {mode === "login" ? "LOGIN" : "SIGNUP"}
          </span>
        </div>

        <div className="flex flex-col gap-2.5 sm:gap-3">

          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-violet-500/40"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-violet-500/40"
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[13px] sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-violet-500/40"
          />

          <button className="mt-2 bg-violet-600/90 hover:bg-violet-600 transition-all text-white text-[13px] sm:text-sm font-semibold py-2.5 rounded-lg shadow-lg shadow-violet-500/10">
            {mode === "login" ? "Login" : "Create Account"}
          </button>

          <div className="flex items-center gap-2 my-2">
            <div className="h-px flex-1 bg-white/[0.08]" />
            <span className="text-[9px] sm:text-[10px] text-white/20">OR</span>
            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <p className="text-[10px] sm:text-[11px] text-white/40 text-center leading-relaxed">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="ml-1 text-violet-400 hover:underline"
            >
              {mode === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>

        <div className="mt-5 sm:mt-6 pt-3 border-t border-white/[0.05]">
          <p className="text-[9px] sm:text-[10px] text-white/20 text-center tracking-wide">
            Secure • Fast • Minimal
          </p>
        </div>
      </div>
    </div>
  );
}