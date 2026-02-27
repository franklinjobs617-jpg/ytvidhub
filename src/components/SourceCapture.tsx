"use client";

import { useEffect } from "react";
import { captureUserSource } from "@/lib/analytics";

export default function SourceCapture() {
  useEffect(() => {
    captureUserSource();
  }, []);
  return null;
}
