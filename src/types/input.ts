import type React from "react";

export type InputProps = {
  label: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
};

