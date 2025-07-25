import { InferenceClient } from "@huggingface/inference";
import { COMPONENT_PROMPT, INITIAL_PROMPT } from "@/lib/prompts";
import type { ActionPayload } from "@/lib/vfs";

const client = new InferenceClient(
  import.meta.env.VITE_HF_TOKEN,
);

export async function getComponentList(prompt: string): Promise<string | Object> {
  const resp = await client.chatCompletion({
    model: "deepseek-ai/DeepSeek-V3",
    messages: [
      { role: 'system', content: INITIAL_PROMPT },
      { role: 'user', content: prompt }
    ]
  });

  const body = resp.choices[0].message.content!;

  if (body.startsWith("CLARIFICATION:")) 
    return body.replace("CLARIFICATION:",'');
  else {
    //Parse the array
    console.log(body);
    return JSON.parse(body);
  }
}

///Returns an array of (filename, contents) tuples
export async function createComponents(compList: any): Promise<Array<ActionPayload>> {
  const generatedComponents = new Array<ActionPayload>();

  for (let comp of compList) {
    const resp = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-V3",
      messages: [
        { role: 'system', content: COMPONENT_PROMPT }, { role: 'user', content: JSON.stringify(comp) } ]
    });

    generatedComponents.push({target: comp.component_name + ".jsx", content: resp.choices[0].message.content!});
  }

  return generatedComponents;
}

//Send plain message (no system prompt)
export async function sendMessage(message: string) {
  const response = await client.chatCompletion({
    model: "deepseek-ai/DeepSeek-V3",
    messages: [{ role: "user", content: message }],
    max_tokens: 256,
  });

  const body = response.choices[0].message.content;

  return body;
}
