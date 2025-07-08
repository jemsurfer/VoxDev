import supabase from "@/lib/supabase";
import { appBoilerPlate, layoutBoilerPlate } from "./boilerPlate";
import { exampleComponent } from "@/test/components";
import type { Routes } from "./interfaces";

export async function compositeApp(pages: Routes[]) {
  var appFile = new File([appBoilerPlate(pages)], "App.jsx");
  writeFile(appFile, "src/App.jsx");

  var layoutFile = new File([layoutBoilerPlate(pages)], "Layout.jsx");
  writeFile(layoutFile, "src/Layout.jsx");

  const templatePaths = await templateFilePaths();

  for (const path of templatePaths) {
    await copyFile(`template/${path}`, path);
  }

  for (var page of pages) {
    const fileName = `${page.name}.jsx`;

    // TODO: Replace with the AI generated code
    var pageFile = new File(
      [formatComponentResponse(exampleComponent)],
      fileName,
    );

    writeFile(pageFile, `src/pages/${fileName}`);
  }

  return true;
}

// No return type because cant get exposed path to FileObject
// TODO: Slow! fix!
async function templateFilePaths(): Promise<string[]> {
  const { data, error } = await supabase.storage
    .from("websites")
    .list("template");

  if (error) {
    return [];
  }

  var nested: Array<string | string[]> = [];

  while (data.length > 0) {
    var cur = data.pop();

    if (cur === undefined) {
      continue;
    }

    // FIX: If statement in if statement
    if (cur.id === null) {
      const nestedData = await supabase.storage
        .from("websites")
        .list(`template/${cur.name}`);

      if (nestedData.error === null) {
        nested.push(nestedData.data?.map((val) => `${cur?.name}/${val.name}`));
      }
    } else {
      nested.push(`${cur.name}`);
    }
  }

  return nested.flat(2);
}

export function formatComponentResponse(response: string) {
  var formattedStr = response.split("\n");

  //Remove the initial ``` at the top and bottom of response
  formattedStr.splice(0, 1);
  formattedStr.splice(formattedStr.length - 1, 1);

  return formattedStr.join("\n");
}

async function writeFile(file: File, path: string): Promise<Object | null> {
  var uid = (await supabase.auth.getUser()).data.user?.id;
  const { data } = await supabase.storage
    .from("websites")
    .upload(`${uid}/${path}`, file);
  return data;
}

async function copyFile(path: string, destination: string) {
  var uid = (await supabase.auth.getUser()).data.user?.id;
  const { data } = await supabase.storage
    .from("websites")
    .copy(path, `${uid}/${destination}`);
  return data;
}
