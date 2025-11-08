import { Mp3Encoder } from "@jambonz/lamejs"

/**
 * Chuyển đổi audio Blob sang MP3 format
 * @param audioBlob - Audio blob (thường là WebM format)
 * @returns Promise<Blob> - MP3 audio blob
 */
export async function convertToMP3(audioBlob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const fileReader = new FileReader()

      fileReader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer
          if (!arrayBuffer || arrayBuffer.byteLength === 0) {
            reject(new Error("Audio file is empty"))
            return
          }

          console.log("Decoding audio data...", { size: arrayBuffer.byteLength })
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0))

          // Xử lý mono hoặc stereo
          const numberOfChannels = audioBuffer.numberOfChannels
          const sampleRate = audioBuffer.sampleRate
          const length = audioBuffer.length

          console.log("Audio decoded:", { channels: numberOfChannels, sampleRate, length })

          let samples: Float32Array

          if (numberOfChannels === 1) {
            // Mono
            samples = audioBuffer.getChannelData(0)
          } else {
            // Stereo - mix down to mono
            const leftChannel = audioBuffer.getChannelData(0)
            const rightChannel = audioBuffer.getChannelData(1)
            samples = new Float32Array(length)
            for (let i = 0; i < length; i++) {
              samples[i] = (leftChannel[i] + rightChannel[i]) / 2
            }
          }

          // Convert float samples to 16-bit PCM
          const samples16bit = new Int16Array(samples.length)
          for (let i = 0; i < samples.length; i++) {
            const s = Math.max(-1, Math.min(1, samples[i]))
            samples16bit[i] = s < 0 ? s * 0x8000 : s * 0x7fff
          }

          // Encode to MP3
          const mp3encoder = new Mp3Encoder(1, sampleRate, 128) // 1 channel, sampleRate, 128kbps
          const sampleBlockSize = 1152
          const mp3Data: Uint8Array[] = []

          for (let i = 0; i < samples16bit.length; i += sampleBlockSize) {
            const sampleChunk = samples16bit.subarray(i, i + sampleBlockSize)
            const mp3buf = mp3encoder.encodeBuffer(sampleChunk)
            if (mp3buf.length > 0) {
              mp3Data.push(new Uint8Array(mp3buf))
            }
          }

          // Flush encoder
          const mp3buf = mp3encoder.flush()
          if (mp3buf.length > 0) {
            mp3Data.push(new Uint8Array(mp3buf))
          }

          if (mp3Data.length === 0) {
            reject(new Error("Failed to encode MP3 data"))
            return
          }

          // Combine all MP3 data
          const totalLength = mp3Data.reduce((acc, arr) => acc + arr.length, 0)
          const combined = new Uint8Array(totalLength)
          let offset = 0
          for (const arr of mp3Data) {
            combined.set(arr, offset)
            offset += arr.length
          }

          console.log("MP3 encoded:", { size: combined.length })
          // Sử dụng audio/mp3 để trình duyệt nhận diện đúng extension
          const mp3Blob = new Blob([combined], { type: "audio/mp3" })
          resolve(mp3Blob)
        } catch (error) {
          console.error("Error in convertToMP3:", error)
          reject(error)
        }
      }

      fileReader.onerror = (error) => {
        console.error("FileReader error:", error)
        reject(new Error("Failed to read audio file"))
      }

      fileReader.readAsArrayBuffer(audioBlob)
    } catch (error) {
      console.error("Error setting up convertToMP3:", error)
      reject(error)
    }
  })
}

/**
 * Tải xuống audio file dưới dạng MP3
 * @param audioBlob - Audio blob cần tải xuống
 * @param filename - Tên file (mặc định: recording-{timestamp}.mp3)
 */
export async function downloadAudioAsMP3(audioBlob: Blob, filename?: string): Promise<void> {
  try {
    console.log("Starting MP3 conversion...", { blobSize: audioBlob.size, blobType: audioBlob.type })
    const mp3Blob = await convertToMP3(audioBlob)
    console.log("MP3 conversion complete", { mp3Size: mp3Blob.size })

    if (mp3Blob.size === 0) {
      throw new Error("MP3 file is empty")
    }

    // Đảm bảo filename luôn có extension .mp3
    const finalFilename = filename 
      ? (filename.endsWith('.mp3') ? filename : `${filename}.mp3`)
      : `recording-${Date.now()}.mp3`

    // Sử dụng File API với MIME type audio/mp3 để đảm bảo extension đúng
    const mp3File = new File([mp3Blob], finalFilename, { 
      type: "audio/mp3", // Sử dụng audio/mp3 để trình duyệt nhận diện đúng
      lastModified: Date.now()
    })

    const url = URL.createObjectURL(mp3File)
    const a = document.createElement("a")
    a.href = url
    a.download = finalFilename // Đảm bảo extension .mp3 trong filename
    a.setAttribute("download", finalFilename) // Force download với đúng tên
    a.style.display = "none"
    document.body.appendChild(a)
    a.click()

    // Cleanup after a short delay
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)
  } catch (error) {
    console.error("Error converting to MP3:", error)
    throw error
  }
}

/**
 * Tải xuống audio file dưới dạng gốc (WebM)
 * @param audioBlob - Audio blob cần tải xuống
 * @param filename - Tên file
 */
export function downloadAudioOriginal(audioBlob: Blob, filename?: string): void {
  try {
    const extension = audioBlob.type.includes("webm") ? "webm" : "audio"
    const url = URL.createObjectURL(audioBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename || `recording-${Date.now()}.${extension}`
    a.style.display = "none"
    document.body.appendChild(a)
    a.click()

    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)
  } catch (error) {
    console.error("Error downloading original audio:", error)
    throw error
  }
}

