// Utility for robust clipboard copying and store URL resolution

export const DEFAULT_PUBLIC_STORE_URL = 'https://ais-pre-pwrboyqchazzfhq2fzh7yj-186037039549.asia-southeast1.run.app';
export const DEFAULT_BRANDED_SHORT_URL = 'https://tinyurl.com/shoukhin-bazar';

/**
 * Returns the best accessible public store URL
 */
export function getStorePublicUrl(customUrl?: string): string {
  if (customUrl && customUrl.trim().length > 0) {
    let url = customUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    return url;
  }

  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    // If running in dev / container with live URL, use origin if valid
    if (origin && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin;
    }
  }

  return DEFAULT_PUBLIC_STORE_URL;
}

/**
 * Generates a clean branded short URL for the shop
 */
export function getBrandedShortUrl(brandSlug: string = 'shoukhin-bazar'): string {
  return `https://tinyurl.com/${brandSlug}`;
}

/**
 * Copy text to clipboard safely with fallback for iframes
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // 1. Try modern Navigator Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Navigator clipboard failed, trying fallback textarea...', err);
    }
  }

  // 2. Fallback using invisible textarea
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback clipboard copy failed', err);
    return false;
  }
}
