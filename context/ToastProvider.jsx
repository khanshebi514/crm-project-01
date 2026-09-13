"use client";

import { createContext, useContext, useState, useCallback } from "react";

import Toast from "@/components/ui/Toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(({ message, type = "success" }) => {
    setToast({
      message,

      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const success = (message) =>
    showToast({
      message,
      type: "success",
    });

  const error = (message) =>
    showToast({
      message,
      type: "error",
    });

  return (
    <ToastContext.Provider
      value={{
        success,

        error,
      }}
    >
      {children}

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
