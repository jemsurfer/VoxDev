import type { ActionPayload } from "./vfs";
import inference from "./inference-hf";
import { INITIAL_PROMPT, COMPONENT_PROMPT } from "./prompts";

export async function getComponentList(prompt: string): Promise<string | Object> {
  const body = await inference([
    {role: "system", content: INITIAL_PROMPT},
    {role: "user", content: prompt}
  ]);

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
    const resp = await inference([
      { role: 'system', content: COMPONENT_PROMPT },
      { role: 'user', content: JSON.stringify(comp) } 
    ]);

    generatedComponents.push({target: comp.component_name + ".jsx", content: resp});
  }

  return generatedComponents;
}