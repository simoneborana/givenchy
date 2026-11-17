/**
 * Normalizes user-supplied media URLs from ImgBB, Postimages, direct CDNs,
 * or Google Drive share links into direct loadable image/video URLs.
 */
export function normalizeMediaUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';

  // Convert Google Drive share URLs:
  // https://drive.google.com/file/d/FILE_ID/view?usp=sharing -> direct view URL
  const driveFileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (driveFileMatch?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveFileMatch[1]}`;
  }

  const driveOpenMatch = trimmed.match(/drive\.google\.com\/open\?id=([^&]+)/i);
  if (driveOpenMatch?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveOpenMatch[1]}`;
  }

  return trimmed;
}

export function isVideoMediaUrl(url: string): boolean {
  const lower = url.toLowerCase().split('?')[0];
  return (
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.mov') ||
    lower.endsWith('.m4v') ||
    url.toLowerCase().includes('video/')
  );
}

export function resolveMediaSrc(
  slotId: string,
  defaultUrl: string,
  overrides: Record<string, string>
): string {
  const custom = overrides[slotId];
  if (custom && custom.trim().length > 0) {
    return normalizeMediaUrl(custom);
  }
  return defaultUrl;
}
