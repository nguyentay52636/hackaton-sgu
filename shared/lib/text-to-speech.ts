const isBrowser = typeof window !== "undefined";

/**
 * Phát hiện ngôn ngữ của một đoạn văn bản
 * @returns 'vi' cho tiếng Việt, 'en' cho tiếng Anh, 'mixed' cho hỗn hợp
 */
function detectLanguage(text: string): "vi" | "en" | "mixed" {
    // Loại bỏ dấu câu và khoảng trắng để kiểm tra
    const cleanText = text.trim();
    if (!cleanText) return "vi";
    
    // Regex để phát hiện ký tự tiếng Việt có dấu
    const vietnamesePattern = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđĐ]/;
    
    // Đếm số ký tự tiếng Việt
    const vietnameseChars = (cleanText.match(/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđĐ]/g) || []).length;
    
    // Đếm số chữ cái tiếng Anh (a-z, A-Z)
    const englishChars = (cleanText.match(/[a-zA-Z]/g) || []).length;
    
    // Nếu có ký tự tiếng Việt, ưu tiên tiếng Việt
    if (vietnameseChars > 0) {
        // Nếu có cả tiếng Anh và tiếng Việt, kiểm tra tỷ lệ
        if (englishChars > 0 && vietnameseChars < englishChars / 2) {
            return "mixed";
        }
        return "vi";
    }
    
    // Nếu chỉ có chữ cái tiếng Anh (không có dấu)
    if (englishChars > 0 && /^[a-zA-Z0-9\s.,!?;:'"()\-]+$/.test(cleanText)) {
        return "en";
    }
    
    // Mặc định là tiếng Việt nếu không rõ
    return "vi";
}

/**
 * Chia văn bản thành các đoạn theo ngôn ngữ
 */
function splitByLanguage(text: string): Array<{ text: string; lang: "vi" | "en" }> {
    const segments: Array<{ text: string; lang: "vi" | "en" }> = [];
    
    // Chia theo từ (bao gồm cả khoảng trắng và dấu câu)
    // Regex để tách: từ, khoảng trắng, dấu câu
    const tokens = text.match(/\S+|\s+/g) || [];
    let currentSegment = "";
    let currentLang: "vi" | "en" | null = null;
    
    for (const token of tokens) {
        // Nếu là khoảng trắng hoặc dấu câu, thêm vào đoạn hiện tại
        if (/^\s+$/.test(token) || /^[.,!?;:'"()\-]+$/.test(token)) {
            currentSegment += token;
            continue;
        }
        
        // Phát hiện ngôn ngữ của token
        const tokenLang = detectLanguage(token);
        const targetLang = tokenLang === "mixed" || tokenLang === "vi" ? "vi" : "en";
        
        if (currentLang === null) {
            // Bắt đầu đoạn mới
            currentLang = targetLang;
            currentSegment = token;
        } else if (currentLang === targetLang) {
            // Cùng ngôn ngữ, thêm vào đoạn hiện tại
            currentSegment += token;
        } else {
            // Khác ngôn ngữ, lưu đoạn hiện tại và bắt đầu đoạn mới
            if (currentSegment.trim()) {
                segments.push({ text: currentSegment.trim(), lang: currentLang });
            }
            currentLang = targetLang;
            currentSegment = token;
        }
    }
    
    // Thêm đoạn cuối cùng
    if (currentSegment.trim() && currentLang) {
        segments.push({ text: currentSegment.trim(), lang: currentLang });
    }
    
    return segments.length > 0 ? segments : [{ text: text.trim(), lang: "vi" }];
}

/**
 * Đợi voices được load (cần thiết cho một số trình duyệt)
 */
function waitForVoices(callback: () => void, maxWait = 3000) {
    if (!isBrowser) return;
    
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        callback();
        return;
    }
    
    let attempts = 0;
    const checkInterval = setInterval(() => {
        attempts++;
        const currentVoices = window.speechSynthesis.getVoices();
        if (currentVoices.length > 0 || attempts * 100 >= maxWait) {
            clearInterval(checkInterval);
            callback();
        }
    }, 100);
    
    // Fallback: trigger voiceschanged event nếu có
    window.speechSynthesis.onvoiceschanged = () => {
        clearInterval(checkInterval);
        callback();
    };
}

/**
 * Lấy giọng đọc phù hợp (ưu tiên giọng nam nếu có)
 */
function getVoiceByLang(lang: string): SpeechSynthesisVoice | null {
    if (!isBrowser) return null;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return null;

    // Ưu tiên giọng nam trong danh sách
    const maleKeywords = ["Male", "Nam", "Man", "John", "David", "Michael", "Minh", "Hùng"];

    // Lọc giọng đúng ngôn ngữ
    const langCode = lang === "vi" ? "vi" : lang === "en" ? "en" : lang.split("-")[0];
    const filtered = voices.filter((v) => {
        const voiceLang = v.lang.split("-")[0].toLowerCase();
        const targetLang = langCode.toLowerCase();
        return voiceLang === targetLang || v.lang.toLowerCase().startsWith(langCode.toLowerCase());
    });

    if (filtered.length === 0) {
        // Fallback: tìm giọng gần nhất
        const fallback = voices.find((v) => {
            const voiceLang = v.lang.split("-")[0].toLowerCase();
            return voiceLang === langCode.toLowerCase();
        });
        return fallback || voices[0];
    }

    // Ưu tiên giọng nam
    const maleVoice = filtered.find((v) =>
        maleKeywords.some((kw) => v.name.toLowerCase().includes(kw.toLowerCase()))
    );

    return maleVoice || filtered[0];
}

// Queue để quản lý các đoạn cần đọc
let speechQueue: SpeechSynthesisUtterance[] = [];
let isProcessingQueue = false;
let onStartCallback: (() => void) | null = null;
let onEndCallback: (() => void) | null = null;

/**
 * Xử lý queue đọc văn bản
 */
function processSpeechQueue() {
    if (isProcessingQueue || speechQueue.length === 0) return;
    
    isProcessingQueue = true;
    const isFirstSegment = !window.speechSynthesis.speaking;
    const utterance = speechQueue.shift();
    
    if (!utterance) {
        isProcessingQueue = false;
        return;
    }
    
    // Gọi callback khi bắt đầu (chỉ lần đầu tiên)
    if (onStartCallback && isFirstSegment) {
        onStartCallback();
    }
    
    utterance.onend = () => {
        isProcessingQueue = false;
        // Đọc đoạn tiếp theo
        if (speechQueue.length > 0) {
            processSpeechQueue();
        } else {
            // Tất cả đã đọc xong
            if (onEndCallback) {
                onEndCallback();
            }
        }
    };
    
    utterance.onerror = () => {
        isProcessingQueue = false;
        // Tiếp tục với đoạn tiếp theo ngay cả khi có lỗi
        if (speechQueue.length > 0) {
            processSpeechQueue();
        } else {
            // Tất cả đã đọc xong (hoặc lỗi)
            if (onEndCallback) {
                onEndCallback();
            }
        }
    };
    
    window.speechSynthesis.speak(utterance);
}

/**
 * Phát âm văn bản (tự động phát hiện và đọc đúng ngôn ngữ)
 * Nếu có từ tiếng Anh thì đọc tiếng Anh, nếu có từ tiếng Việt thì đọc tiếng Việt
 */
export const speak = (
    text: string,
    lang: string = "vi-VN",
    onStart?: () => void,
    onEnd?: () => void
) => {
    if (!isBrowser) {
        console.warn("speak() called in non-browser environment");
        return;
    }

    stopSpeech();
    
    // Lưu callbacks
    onStartCallback = onStart || null;
    onEndCallback = onEnd || null;

    // Đợi voices được load trước khi đọc
    waitForVoices(() => {
        try {
            // Chia văn bản thành các đoạn theo ngôn ngữ
            const segments = splitByLanguage(text);
            
            // Nếu chỉ có một đoạn, đọc trực tiếp
            if (segments.length === 1) {
                const segment = segments[0];
                const msg = new SpeechSynthesisUtterance(segment.text);
                const langCode = segment.lang === "vi" ? "vi-VN" : "en-US";
                msg.lang = langCode;
                
                const voice = getVoiceByLang(segment.lang);
                if (voice) {
                    msg.voice = voice;
                }
                
                msg.rate = 1;
                msg.pitch = 1;
                msg.volume = 1;
                
                if (onStartCallback) {
                    msg.onstart = () => onStartCallback?.();
                }
                
                if (onEndCallback) {
                    msg.onend = () => onEndCallback?.();
                    msg.onerror = () => onEndCallback?.();
                }
                
                window.speechSynthesis.speak(msg);
                return;
            }
            
            // Nếu có nhiều đoạn, đọc tuần tự
            speechQueue = [];
            for (const segment of segments) {
                const msg = new SpeechSynthesisUtterance(segment.text);
                const langCode = segment.lang === "vi" ? "vi-VN" : "en-US";
                msg.lang = langCode;
                
                const voice = getVoiceByLang(segment.lang);
                if (voice) {
                    msg.voice = voice;
                }
                
                msg.rate = 1;
                msg.pitch = 1;
                msg.volume = 1;
                
                speechQueue.push(msg);
            }
            
            // Bắt đầu đọc queue
            processSpeechQueue();
        } catch (error) {
            console.error("Error in speech synthesis:", error);
            if (onEndCallback) {
                onEndCallback();
            }
        }
    });
};

/**
 * Dừng đọc
 */
export const stopSpeech = () => {
    if (!isBrowser) return;
    try {
        window.speechSynthesis.cancel();
        speechQueue = [];
        isProcessingQueue = false;
        onStartCallback = null;
        if (onEndCallback) {
            onEndCallback();
            onEndCallback = null;
        }
    } catch (error) {
        console.error("Error stopping speech synthesis:", error);
    }
};
