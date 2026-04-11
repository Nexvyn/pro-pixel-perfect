/* eslint-disable no-console */
/* eslint-env node */
import fs from 'fs';
import path from 'path';

const MANIFESTS_BASE_DIR = 'registry/manifests';
const OUTPUT_FILE = 'registry/index.ts';

async function updateRegistryIndex() {
  console.log('Updating registry index...');

  const registry = {};
  const types = ['components', 'icons', 'loaders'];
  
  for (const type of types) {
    const typeDir = path.join(MANIFESTS_BASE_DIR, type);
    if (!fs.existsSync(typeDir)) continue;

    const files = fs.readdirSync(typeDir).filter(f => f.endsWith('.json')).sort();
    
    for (const file of files) {
      const content = fs.readFileSync(path.join(typeDir, file), 'utf8');
      const manifest = JSON.parse(content);
      
      const name = manifest.name;
      const entry = {
        name: manifest.name,
        type: manifest.type,
        files: manifest.files.map(f => f.path),
        dependencies: manifest.dependencies || [],
        registryDependencies: manifest.registryDependencies || []
      };

      let key = name;
      if (registry[key]) {
        if (type === 'icons') key = `${name}-icon`;
        else if (type === 'loaders') key = `${name}-loader`;
      }

      registry[key] = entry;
    }
  }

  const output = `// Auto-generated registry index
// Maps component names to their file paths for CLI installation

export const registry = ${JSON.stringify(registry, null, 2)} as const;

export type ComponentName = keyof typeof registry;
`;

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log('Registry index updated successfully!');
}

updateRegistryIndex().catch(err => {
  console.error('Failed to update registry index:', err);
  process.exit(1);
});
