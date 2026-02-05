import { PDFParse } from "pdf-parse";

export async function parseResume(buffer) {
  const parser = new PDFParse({ data: buffer });
  const data = await parser.getText();
  await parser.destroy();
  return data.text;
}
