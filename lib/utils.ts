import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: string): string {
  if (!timestamp) return "Unknown date";

  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    console.log(diffTime);

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return diffMinutes <= 1 ? "Just now" : `${diffMinutes} minutes ago`;
      }
      return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

export function ensureHttpPrefix(url: string): string {
  if (!url) return "#";

  return url.match(/^https?:\/\//) ? url : `https://${url}`;
}

export function extractHiringManagerNameFromLinkedIn(
  url: string
): string | undefined {
  if (!url) return;

  const parts = url.split("/");
  const hiringManagerPart = parts.findIndex((part) => part.includes("in"));

  if (hiringManagerPart === -1) return "Click to view";

  return parts[hiringManagerPart + 2]
    .split("-")
    .splice(0, 2)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
