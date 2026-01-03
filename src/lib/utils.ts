import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Less than 1 minute
  if (diff < 60000) {
    return 'Just now';
  }
  
  // Less than 1 hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  }
  
  // Less than 24 hours
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours}h ago`;
  }
  
  // Less than 7 days
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days}d ago`;
  }
  
  // Default format
  return date.toLocaleDateString();
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function validatePhoneNumber(phone: string): boolean {
  // Basic phone number validation - starts with + and contains only numbers
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Ensure it starts with +
  if (!cleaned.startsWith('+')) {
    return '+' + cleaned;
  }
  
  return cleaned;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function parseCSV(csvText: string): string[] {
  const lines = csvText.split('\n');
  const phoneNumbers: string[] = [];
  
  // Skip header row if it looks like a header
  const startIndex = lines[0]?.toLowerCase().includes('phone') ? 1 : 0;
  
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (line) {
      // Take the first column as phone number
      const firstColumn = line.split(',')[0]?.trim();
      if (firstColumn && firstColumn !== 'phone') {
        const formattedPhone = formatPhoneNumber(firstColumn);
        if (validatePhoneNumber(formattedPhone)) {
          phoneNumbers.push(formattedPhone);
        }
      }
    }
  }
  
  return phoneNumbers;
}
