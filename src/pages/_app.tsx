import VideoService from "@/services/VideoService";
import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export const videoService = new VideoService(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
