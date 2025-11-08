import { NextResponse } from "next/server";

const LANGUAGE_NAMES: Record<string, string> = {
  vi: "tiếng Việt",
  en: "tiếng Anh",
  fr: "tiếng Pháp",
  es: "tiếng Tây Ban Nha",
  de: "tiếng Đức",
  ja: "tiếng Nhật",
  ko: "tiếng Hàn",
  zh: "tiếng Trung",
  th: "tiếng Thái",
  id: "tiếng Indonesia",
};

const FALLBACK_MODELS = [
  "deepseek/deepseek-chat-v3.1:free",
  "microsoft/phi-3-mini-128k-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "google/gemini-flash-1.5-8b:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "qwen/qwen-2-7b-instruct:free",
  "deepseek/deepseek-chat:free",
];

async function callOpenRouter(
  apiKey: string,
  model: string,
  messages: any[],
  safeReferer: string,
  safeTitle: string
) {
  return fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": safeReferer,
      "X-Title": safeTitle,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2,
      max_tokens: 2000,
    }),
  });
}

function extractTranslation(data: any): string | null {
  if (!data) return null;

  const content =
    data?.choices?.[0]?.message?.content ||
    data?.choices?.[0]?.content ||
    data?.content ||
    data?.message?.content ||
    null;

  if (!content || typeof content !== "string") return null;

  let cleaned = content
    .replace(/^(Translation|Bản dịch|Dịch|Translated|Here is|Đây là):\s*/i, "")
    .replace(/\[OUT\]\s*/gi, "")
    .replace(/\s*\[\/OUT\]/gi, "")
    .replace(/^```[\w]*\n?|\n?```$/g, "")
    .trim();

  // Remove quotes at start/end
  while (true) {
    const prev = cleaned;
    cleaned = cleaned.replace(/^["'""'']+|["'""'']+$/g, "").trim();
    if (
      (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
      (cleaned.startsWith("'") && cleaned.endsWith("'"))
    ) {
      cleaned = cleaned.slice(1, -1).trim();
    }
    if (cleaned === prev) break;
  }

  return cleaned
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#x2F;/g, "/")
    .replace(/\s+/g, " ")
    .trim();
}

async function translateApi(req: Request) {
  try {
    const { text, sourceLang, targetLang } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Thiếu OPENROUTER_API_KEY trên server" },
        { status: 500 }
      );
    }

    if (!text?.trim() || !sourceLang || !targetLang) {
      return NextResponse.json(
        { error: "Dữ liệu đầu vào không hợp lệ" },
        { status: 400 }
      );
    }

    if (sourceLang === targetLang) {
      return NextResponse.json({ translation: text });
    }

    const sourceLangName = LANGUAGE_NAMES[sourceLang] || sourceLang;
    const targetLangName = LANGUAGE_NAMES[targetLang] || targetLang;

    const safeReferer = (process.env.SITE_URL || "http://localhost:3000").replace(
      /[^\x00-\x7F]/g,
      ""
    );
    const safeTitle = (process.env.SITE_NAME || "hackaton").replace(
      /[^\x00-\x7F]/g,
      ""
    );

    const messages = [
      {
        role: "system",
        content: `You are a professional translator. Translate from ${sourceLangName} to ${targetLangName} accurately and naturally. Return only the translation, no explanations.`,
      },
      {
        role: "user",
        content: `Translate: "${text}"`,
      },
    ];

    const models = [
      process.env.OPENROUTER_MODEL || "microsoft/phi-3-mini-128k-instruct:free",
      ...FALLBACK_MODELS,
    ];

    for (const model of models) {
      try {
        const response = await callOpenRouter(
          apiKey,
          model,
          messages,
          safeReferer,
          safeTitle
        );

        if (response.ok) {
          const data = await response.json();
          const translation = extractTranslation(data);
          if (translation) {
            return NextResponse.json({ translation });
          }
        }
      } catch (error) {
        continue;
      }
    }

    return NextResponse.json(
      {
        error:
          "Không thể dịch. Vui lòng kiểm tra API key tại https://openrouter.ai/settings/privacy",
      },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi dịch văn bản" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  return translateApi(req);
}
