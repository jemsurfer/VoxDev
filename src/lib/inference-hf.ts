import { InferenceClient } from "@huggingface/inference";
import type { ChatCompletionInputMessage } from "@/models/ChatCompletionInputMessage";

const client = new InferenceClient(
  import.meta.env.VITE_HF_TOKEN,
);

//Implementation of inference
export default async function inference(msgs: Array<ChatCompletionInputMessage>): Promise<string> {
    const res = await client.chatCompletion({
        model: "deepseek-ai/DeepSeek-V3",
        messages: msgs
    });

    return res.choices[0].message.content!;
}