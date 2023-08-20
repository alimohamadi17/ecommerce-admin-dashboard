"use client";

import { FC, useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean;
}

export const AlertModal: FC<AlertModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title="Are you sure?"
      description="this action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full flex items-center pt-6 space-x-2 justify-end">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="blue" onClick={onConfirm} disabled={loading}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
