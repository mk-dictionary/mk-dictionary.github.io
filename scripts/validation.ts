import { readFileSync, readdirSync } from "fs";
import { join, relative, sep } from "path";
import { EntrySchema, FOLDER_TO_POS } from "../schema/entry";
import {decode }from '@toon-format/toon'
const baseDir = "entries";

/**
 * If filenames are passed as CLI args (from the GitHub Action's changed-file
 * diff), validate only those. Otherwise walk every file under entries/ —
 * useful for running this locally with no args to check everything.
 */

// needs to be updated to use .toon files instead of .json files, since the entries are now in .toon format
function getFilesToCheck(): string[] {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    return args.filter((f) => f.endsWith(".toon"));
  }

  const all: string[] = [];
  for (const folder of readdirSync(baseDir)) {
    const dir = join(baseDir, folder);
    for (const file of readdirSync(dir)) {
      if (file.endsWith(".toon")) all.push(join(dir, file));
    }
  }
  return all;
}

function checkFile(path: string): string[] {
  const errors: string[] = [];

  const parts = relative(baseDir, path).split(sep);
  const folder = parts[0];
  const expectedPos = FOLDER_TO_POS[folder as keyof typeof FOLDER_TO_POS];

  if (!expectedPos) {
    errors.push(`unrecognized folder "${folder}" — not a known part of speech`);
    return errors;
  }

  let raw: string;
  try {
    raw = readFileSync(path, "utf-8");
  } catch (e) {
    errors.push(`could not read file — ${(e as Error).message}`);
    return errors;
  }

  let toon: unknown;
  try {
    toon = decode(raw);
  } catch (e) {
    errors.push(`invalid TOON — ${(e as Error).message}`);
    return errors;
  }

  const result = EntrySchema.safeParse(toon);
  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push(`${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
    return errors;
  }

  if (result.data.part_of_speech !== expectedPos) {
    errors.push(
      `part_of_speech is "${result.data.part_of_speech}" but file lives in "${folder}/"`
    );
  }

  return errors;
}

const files = getFilesToCheck();

if (files.length === 0) {
  console.log("No changed entry files to validate.");
  process.exit(0);
}

let hasError = false;

for (const path of files) {
  const errors = checkFile(path);
  if (errors.length > 0) {
    hasError = true;
    console.error(`✗ ${path}`);
    for (const e of errors) console.error(`    ${e}`);
  }
}

if (hasError) {
  console.error("\nValidation failed.");
  process.exit(1);
} else {
  console.log(`✓ ${files.length} changed entr${files.length === 1 ? "y" : "ies"} validated.`);
}
// above is all ai. 