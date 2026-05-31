// Orchestrateur — génère les 9 annexes types en cascade
const { execSync } = require('child_process');
const scripts = [
  'gen_annexes_01_02_03.js',
  'gen_annexes_04_05_06_07.js',
  'gen_annexe_08_illustrations.js',
  'gen_annexe_09_lecteur_mifare.js',
];
for (const s of scripts) {
  console.log(`\n=== ${s} ===`);
  try {
    execSync(`node ${__dirname}/${s}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Erreur lors de ${s}: ${e.message}`);
  }
}
console.log("\nDONE — 9 annexes produites");
