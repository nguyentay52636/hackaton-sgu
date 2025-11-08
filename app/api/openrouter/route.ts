import { NextResponse } from "next/server";

async function openrouterApi(req: Request) {
  try {
    const body = await req.json();
    const { prompt, messages: conversationHistory } = body;

    console.log("[OpenRouter API] Received request:", { 
      hasPrompt: !!prompt, 
      promptLength: prompt?.length,
      historyLength: conversationHistory?.length 
    });

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("[OpenRouter API] Missing API key");
      return NextResponse.json(
        { error: "Thiếu OPENROUTER_API_KEY trên server" },
        { status: 500 }
      );
    }

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return NextResponse.json(
        { error: "Prompt không hợp lệ" },
        { status: 400 }
      );
    }

    const safeReferer = (process.env.SITE_URL || "").replace(/[^\x00-\x7F]/g, "");
    const safeTitle = (process.env.SITE_NAME || "Sài Gòn Culinary Hub").replace(
      /[^\x00-\x7F]/g,
      ""
    );

    const messages = [
      {
        role: "system",
        content:
          "Bạn là trợ lý học tập ảo thân thiện và chuyên nghiệp của nền tảng học trực tuyến. " +
          "Nhiệm vụ của bạn là:\n" +
          "- Giải thích các khái niệm trong khóa học, ví dụ: lập trình, du lịch, ngôn ngữ, AI, v.v.\n" +
          "- Tư vấn cách học hiệu quả và gợi ý thêm tài liệu tham khảo.\n" +
          "- Tóm tắt nội dung bài học hoặc video khi được yêu cầu.\n" +
          "- Trả lời câu hỏi của học sinh về nội dung bài học một cách dễ hiểu, ngắn gọn, thân thiện.\n" +
          "- Sử dụng tiếng Việt, không dùng HTML hoặc Markdown.\n" +
          "- Nếu không chắc chắn, hãy trả lời trung thực: 'Tôi không chắc lắm, bạn có thể xem lại phần bài giảng tương ứng.'",
      },
    ];
    

    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      messages.push(...conversationHistory);
    }
    messages.push({
      role: "user",
      content: prompt,
    });

    const defaultModel = "deepseek/deepseek-chat";
    const model = process.env.OPENROUTER_MODEL || defaultModel;

    const requestBody = {
      model: model,
      messages: messages,
      temperature: 0.7,
    };

    console.log("[OpenRouter API] Calling OpenRouter with model:", requestBody.model);
    console.log("[OpenRouter API] Messages count:", messages.length);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": safeReferer || "http://localhost:3000",
        "X-Title": safeTitle || "Sai Gon Culinary Hub",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("[OpenRouter API] Response status:", response.status);

    if (!response.ok) {
      const err = await response.text();
      console.error("[OpenRouter API] Error response:", err);
      
      // Nếu lỗi 404 về data policy, thử model fallback
      if (response.status === 404 && err.includes("data policy")) {
        console.log("[OpenRouter API] Model requires privacy settings, trying fallback model...");
        
        // Thử với model fallback không yêu cầu privacy settings
        const fallbackModels = [
          "deepseek/deepseek-chat-v3.1:free",
          "deepseek/deepseek-chat:free",
          "deepseek/deepseek-chat",
          "meta-llama/llama-3.2-3b-instruct:free",
          "google/gemini-flash-1.5-8b:free",
          "qwen/qwen-2.5-7b-instruct:free"
        ];
        
        for (const fallbackModel of fallbackModels) {
          console.log(`[OpenRouter API] Trying fallback model: ${fallbackModel}`);
          
          const fallbackResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "HTTP-Referer": safeReferer || "http://localhost:3000",
              "X-Title": safeTitle || "Sai Gon Culinary Hub",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: fallbackModel,
              messages: messages,
              temperature: 0.7,
            }),
          });
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            console.log("[OpenRouter API] Fallback model succeeded");
            
            function stripHtml(input: string) {
              if (typeof input !== "string") return input;
              const withoutTags = input.replace(/<[^>]*>/g, " ");
              const replaced = withoutTags
                .replace(/&nbsp;/g, " ")
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&#39;/g, "'")
                .replace(/&quot;/g, '"');
              return replaced.replace(/\s+/g, " ").trim();
            }
            
            if (Array.isArray(fallbackData?.choices) && fallbackData.choices.length > 0) {
              for (const choice of fallbackData.choices) {
                const content = choice?.message?.content || choice?.content;
                if (typeof content === "string") {
                  if (choice.message) {
                    choice.message.content = stripHtml(content);
                  } else {
                    choice.content = stripHtml(content);
                  }
                }
              }
            }
            
            return NextResponse.json(fallbackData);
          }
        }
        
        return NextResponse.json(
          { 
            error: "Model yêu cầu cấu hình privacy settings. Vui lòng truy cập https://openrouter.ai/settings/privacy để cấu hình, hoặc sử dụng model khác trong biến môi trường OPENROUTER_MODEL" 
          },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: err || "OpenRouter error" },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log("[OpenRouter API] Response received, choices count:", data?.choices?.length);

    if (data.error) {
      console.error("[OpenRouter API] Error in response:", data.error);
      return NextResponse.json(
        { error: data.error.message || "OpenRouter API error" },
        { status: 500 }
      );
    }

    function stripHtml(input: string) {
      if (typeof input !== "string") return input;
      const withoutTags = input.replace(/<[^>]*>/g, " ");
      const replaced = withoutTags
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');
      return replaced.replace(/\s+/g, " ").trim();
    }
    if (Array.isArray(data?.choices) && data.choices.length > 0) {
      for (const choice of data.choices) {
        const content = choice?.message?.content || choice?.content;
        if (typeof content === "string") {
          if (choice.message) {
            choice.message.content = stripHtml(content);
          } else {
            choice.content = stripHtml(content);
          }
        }
      }
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Lỗi khi gọi OpenRouter API" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  return openrouterApi(req);
}
