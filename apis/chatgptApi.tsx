fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
        "Authorization": "Bearer <OPENROUTER_API_KEY>",
        "HTTP-Referer": "", // Optional. Site URL for rankings on openrouter.ai.
        "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "model": "openai/gpt-4",
        "messages": [
            {
                "role": "user",
                "content": "What is the meaning of life?"
            }
        ]
    })
}).then(response => response.json()).then(data => console.log(data));