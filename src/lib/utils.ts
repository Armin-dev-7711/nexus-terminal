import { clsx, type ClassValue } from "clsx";
// @ts-expect-error tailwind-merge types declaration issue in modern bundlers
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
