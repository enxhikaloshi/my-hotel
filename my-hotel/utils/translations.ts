
import path from 'path';
import { promises as fs } from 'fs';

export async function loadTranslations(lang: string): Promise<Record<string, string>> {
  const candidates = [
    path.resolve(process.cwd(), 'locales', lang, 'common.json'),
    path.resolve(process.cwd(), 'my-hotel', 'locales', lang, 'common.json'),
    path.resolve(__dirname, '..', 'locales', lang, 'common.json'),
  ];

  for (const filePath of candidates) {
    try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(fileData) as unknown;
      const obj = (parsed && (parsed as any).default) ? (parsed as any).default : parsed;

      if (obj && typeof obj === 'object') {
        // Ensure all values are strings
        const normalized: Record<string, string> = {};
        for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
          normalized[k] = v == null ? '' : String(v);
        }
        return normalized;
      }
    } catch (err) {
      // try next candidate
      // keep quiet except for debug purposes
      // console.debug(`translations: failed to read ${filePath}:`, (err as Error).message);
    }
  }

  // fallback empty mapping
  return {};
}
