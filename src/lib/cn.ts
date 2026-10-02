import { clsx, type ClassValue } from "clsx";

/** Concatène des classes conditionnelles : cn("a", isOn && "b"). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
