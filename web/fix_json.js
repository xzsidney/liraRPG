const fs = require('fs');
const path = require('path');

const dir = "C:\\Sidney\\1_Game\\liraRPG\\personagens\\Lobo5";
const out = "C:\\Sidney\\1_Game\\liraRPG\\liraRPG\\web\\data\\characters_lobo.js";

const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
let characters = [];

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Fix "key: value" inside quotes -> "key": value
  content = content.replace(/"([a-zA-Z_]+):\s*(\d+)"/g, '"$1": $2');
  
  // Try to parse
  try {
    const json = JSON.parse(content);
    // Add id
    const baseName = file.replace('.json', '');
    json.id = baseName.toLowerCase().replace(/\s+/g, '_').replace(/'/g, '').replace(//g, 'a').replace(/-/g, '_');
    json.retrato = `assets/portraits/${json.id}.png`;
    characters.push(json);
  } catch (e) {
    console.error(`Error parsing ${file}:`, e.message);
  }
}

const jsContent = `const CHARACTERS_LOBO = ${JSON.stringify(characters, null, 2)};`;
fs.writeFileSync(out, jsContent, 'utf8');
console.log("Successfully compiled", characters.length, "characters.");
