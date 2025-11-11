import baseApi from "./baseApi";

export async function registerFace(email: string, imageBase64: string) {
  const { data } = await baseApi.post("/face/register", { email, imageBase64 });
  return data;
}

export async function loginFace(imageBase64: string) {
  const { data } = await baseApi.post("/face/login", { imageBase64 });
  return data;
}

export async function imageFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.startsWith("data:") ? result : `data:image/jpeg;base64,${result}`);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function registerFaceWithFile(email: string, file: File) {
  const imageBase64 = await imageFileToBase64(file);
  return registerFace(email, imageBase64);
}

export async function loginFaceWithFile(file: File) {
  const imageBase64 = await imageFileToBase64(
    file);
  return loginFace(imageBase64);
}
