"use client";

import { useEffect, useState } from "react";

import { MobileSidebarSheet } from "@/components/layout/navbar";
import { AuthModal } from "@/features/auth/components/auth-modal";
import { CartSheet } from "@/features/cart/components/cart-sheet";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CartSheet />
      <MobileSidebarSheet />
      <AuthModal />
    </>
  );
};
