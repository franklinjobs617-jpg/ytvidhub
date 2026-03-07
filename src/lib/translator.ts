const LIBRE_TRANSLATE_API = 'https://libretranslate.com/translate';

export async function translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
  try {
    const res = await fetch(LIBRE_TRANSLATE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      })
    });

    if (!res.ok) throw new Error('Translation failed');
    const data = await res.json();
    return data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export async function translateSubtitles(
  texts: string[],
  sourceLang: string,
  targetLang: string,
  onProgress?: (current: number, total: number) => void
): Promise<string[]> {
  const results: string[] = [];

  for (let i = 0; i < texts.length; i++) {
    const translated = await translateText(texts[i], sourceLang, targetLang);
    results.push(translated);
    onProgress?.(i + 1, texts.length);
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return results;
}
