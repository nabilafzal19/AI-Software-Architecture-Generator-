import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({
  input,
  output,
});

export async function askUser(question: string): Promise<string> {
  return rl.question(question);
}

export function closeTerminal() {
  rl.close();
}