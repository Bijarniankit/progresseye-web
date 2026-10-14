import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const skillsDir = path.resolve(__dirname, "../.agents/skills");

if (!fs.existsSync(skillsDir)) {
  console.error(`Skills directory not found: ${skillsDir}`);
  process.exit(1);
}

const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
const skillFolders = entries.filter((e) => e.isDirectory() && e.name.startsWith("pe-"));

let errors = 0;
let validated = 0;

for (const folder of skillFolders) {
  const folderName = folder.name;
  const skillFile = path.join(skillsDir, folderName, "SKILL.md");

  if (!fs.existsSync(skillFile)) {
    console.error(`FAIL [${folderName}]: Missing SKILL.md`);
    errors++;
    continue;
  }

  const content = fs.readFileSync(skillFile, "utf-8");
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!frontmatterMatch) {
    console.error(`FAIL [${folderName}]: Missing frontmatter (--- ... ---)`);
    errors++;
    continue;
  }

  const frontmatter = frontmatterMatch[1];
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);

  if (!nameMatch) {
    console.error(`FAIL [${folderName}]: Missing 'name' in frontmatter`);
    errors++;
    continue;
  }

  const nameVal = nameMatch[1].trim();
  if (nameVal !== folderName) {
    console.error(`FAIL [${folderName}]: Name '${nameVal}' does not match folder '${folderName}'`);
    errors++;
    continue;
  }

  if (!descMatch?.[1].trim()) {
    console.error(`FAIL [${folderName}]: Missing or empty 'description' in frontmatter`);
    errors++;
    continue;
  }

  console.log(`PASS [${folderName}]: Validated name & description`);
  validated++;
}

console.log(`\nSkills validation complete: ${validated} passed, ${errors} failed.`);
if (errors > 0) {
  process.exit(1);
}
