import { InferenceClient } from "@huggingface/inference";
import { INITIAL_PROMPT } from "./prompts";

const client = new InferenceClient(
  import.meta.env.VITE_HUGGING_FACE_ACCESS_TOKEN,
);

export async function getComponentList(prompt: string) {
  const resp = await client.chatCompletion({
    model: "deepseek-ai/DeepSeek-V3",
    messages: [
      { role: 'system', content: INITIAL_PROMPT },
      { role: 'user', content: prompt }
    ]
  });

  const body = resp.choices[0].message.content;

  if (body?.startsWith("CONFIRMATION")) {

  }

}

export async function sendMessage(message: string) {
  const response = await client.chatCompletion({
    model: "deepseek-ai/DeepSeek-V3",
    messages: [{ role: "user", content: message }],
    max_tokens: 256,
  });

  const body = response.choices[0].message.content;

  return body;
}
