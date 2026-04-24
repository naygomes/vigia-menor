import fs from "node:fs";

function readFile(absolutePath: string) {
  const content = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(content);
}

export function loadSeedData(seedPath: string) {
  try {
    const fileContent = readFile(seedPath);
    return fileContent;
  } catch (error) {
    console.error("[SeedLoader] Erro ao carregar seed.json:", error);
    return [];
  }
}