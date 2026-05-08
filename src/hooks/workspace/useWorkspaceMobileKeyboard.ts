import { useEffect, useState } from "react";

export function useWorkspaceMobileKeyboard(showMobileUrlInput: boolean) {
  const [mobileKeyboardInset, setMobileKeyboardInset] = useState(0);

  useEffect(() => {
    if (!showMobileUrlInput) {
      setMobileKeyboardInset(0);
      return;
    }

    const updateKeyboardInset = () => {
      const viewport = window.visualViewport;
      if (!viewport) {
        setMobileKeyboardInset(0);
        return;
      }

      const inset = Math.max(
        0,
        Math.round(window.innerHeight - viewport.height - viewport.offsetTop),
      );
      setMobileKeyboardInset(inset);
    };

    updateKeyboardInset();

    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", updateKeyboardInset);
    viewport?.addEventListener("scroll", updateKeyboardInset);
    window.addEventListener("orientationchange", updateKeyboardInset);

    return () => {
      viewport?.removeEventListener("resize", updateKeyboardInset);
      viewport?.removeEventListener("scroll", updateKeyboardInset);
      window.removeEventListener("orientationchange", updateKeyboardInset);
      setMobileKeyboardInset(0);
    };
  }, [showMobileUrlInput]);

  return mobileKeyboardInset;
}
