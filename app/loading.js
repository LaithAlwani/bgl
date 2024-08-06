"use client";
import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <div className="loading-screen">
      <Loader size={96} />
    </div>
  );
}
