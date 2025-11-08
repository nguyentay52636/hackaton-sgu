import type { TranscriptSegment } from "./types";

export interface WhisperResult {
  text: string;
  segments?: TranscriptSegment[];
  raw?: any;
}

export interface WhisperOptions {
  language?: string;
  model?: string;
}

/**
 * Send audio (File or Blob) to the local Whisper STT service.
 *
 * - Posts multipart/form-data to http://localhost:5000/api/stt/whisper
 * - Returns a parsed JSON result. Common fields: `text`, `segments`.
 *
 * Example usage:
 * const result = await transcribeWithWhisper(file);
 * console.log(result.text);
 */
export async function transcribeWithWhisper(
  file: File | Blob,
  options?: WhisperOptions
): Promise<WhisperResult> {
  const url = "http://localhost:5000/api/stt/whisper";

  const form = new FormData();
  // Provide filename when available (File has a name). If Blob, fallback to audio.wav
  const fileName = (file instanceof File && file.name) ? file.name : "audio.wav";
  form.append("file", file, fileName);

  if (options?.language) form.append("language", options.language);
  if (options?.model) form.append("model", options.model);

  const resp = await fetch(url, {
    method: "POST",
    body: form,
  });

  if (!resp.ok) {
    const bodyText = await resp.text();
    throw new Error(`Whisper API error ${resp.status}: ${bodyText}`);
  }

  const data = await resp.json().catch(async () => {
    // If response isn't JSON, return raw text
    const text = await resp.text();
    return { text };
  });

  // Normalize common response shapes
  const text = data?.text ?? data?.transcript ?? (typeof data === "string" ? data : "");
  const segments: TranscriptSegment[] | undefined = data?.segments;

  return { text, segments, raw: data };
}

/**
 * Convenience helper to fetch an audio Blob from a URL and transcribe it.
 */
export async function transcribeAudioUrl(url: string, options?: WhisperOptions) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to fetch audio from ${url}: ${resp.status}`);
  const blob = await resp.blob();
  return transcribeWithWhisper(blob, options);
}

export default {
  transcribeWithWhisper,
  transcribeAudioUrl,
};
