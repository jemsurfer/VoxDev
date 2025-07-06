import supabase from "@/lib/supabase";
import { appBoilerPlate } from "./boilerPlate";

export async function compositeApp(pages: string[]) {
  var appFile = new File([appBoilerPlate(pages)], "App.jsx");

  const templatePaths = await templateFilePaths();

  for (const path of templatePaths) {
    await copyFile(`template/${path}`, path);
  }

  writeFile(appFile, "src/App.jsx");
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
