import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Không có file âm thanh!" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = `/tmp/${Date.now()}-voice.mp3`;
    fs.writeFileSync(filePath, buffer);

    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
      language: "vi",
    });

    fs.unlinkSync(filePath);
    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("❌ Lỗi Whisper:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
