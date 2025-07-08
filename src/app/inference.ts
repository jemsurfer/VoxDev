import { InferenceClient } from "@huggingface/inference";

export async function sendMessage(message: string) {
  const client = new InferenceClient(
    import.meta.env.VITE_HUGGING_FACE_ACCESS_TOKEN,
  );

  const response = await client.chatCompletion({
    model: "deepseek-ai/DeepSeek-V3",
    messages: [{ role: "user", content: message }],
    max_tokens: 256,
  });

  const body = response.choices[0].message.content;

  return body;
}
