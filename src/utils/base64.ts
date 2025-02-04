export function encodeBase64(data: ArrayBuffer | ArrayBufferLike): string {
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(data))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeBase64(str: string): ArrayBuffer {
  // Normalize Base64 string
  const normalizedBase64 = str
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .replace(/\s+/g, "");

  // Add padding
  const pad = normalizedBase64.length % 4;
  const paddedBase64 = pad
    ? normalizedBase64 + "=".repeat(4 - pad)
    : normalizedBase64;

  try {
    // Base64 decode
    const binaryString = atob(paddedBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error("Base64 decode error:", error);
    console.error("Input base64 length:", str.length);
    throw error;
  }
}

export function encodeBase64Url(obj: Record<string, unknown>): string {
  const str = JSON.stringify(obj);
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  return encodeBase64(data.buffer);
}
