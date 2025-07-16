import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateInvoiceNumber(lastNumber = 0) {
  const year = new Date().getFullYear();
  const nextSequence = String(lastNumber + 1).padStart(4, '0');
  return `INV-${year}-${nextSequence}`;
}
