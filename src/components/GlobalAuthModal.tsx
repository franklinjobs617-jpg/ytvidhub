"use client";

import LoginModal from "@/components/LoginModel";
import { useAuth } from "@/context/AuthContext";

export function GlobalAuthModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuth();

  return (
    <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
  );
}
