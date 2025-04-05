import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface FloatingPortalProps {
  children: React.ReactNode;
}

export const FloatingPortal: React.FC<FloatingPortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};