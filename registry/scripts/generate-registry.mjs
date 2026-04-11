/* eslint-disable no-console */
/* eslint-env node */
import fs from 'fs';
import path from 'path';

const MANIFESTS_DIR = 'registry/manifests';
const OUTPUT_DIR = 'public/r';

async function buildRegistry() {
  console.log('Building registry...');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const types = ['components', 'icons', 'loaders'];
  const preparedStyles = new Set();
  
  for (const type of types) {
    const manifestPath = path.join(MANIFESTS_DIR, type);
    if (!fs.existsSync(manifestPath)) continue;

    const files = fs.readdirSync(manifestPath).filter(f => f.endsWith('.json')).sort();
    
    for (const file of files) {
      const manifestContent = fs.readFileSync(path.join(manifestPath, file), 'utf8');
      const manifest = JSON.parse(manifestContent);
      
      const style = manifest.style || 'new-york-v4';
      const targetDir = path.join(OUTPUT_DIR, 'styles', style);
      
      if (!preparedStyles.has(style) && fs.existsSync(targetDir)) {
        fs.rmSync(targetDir, { recursive: true, force: true });
      }

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      preparedStyles.add(style);

      if (manifest.files) {
        manifest.files = manifest.files.map(f => {
          try {
            const filePath = path.join(process.cwd(), f.path);
            const content = fs.readFileSync(filePath, 'utf8');
            return { ...f, content };
          } catch (err) {
            console.error(`Failed to read file ${f.path}:`, err.message);
            return f;
          }
        });
      }

      let outputFileName = file;
      if (type === 'icons') {
        outputFileName = `icon-${file}`;
      } else if (type === 'loaders') {
        outputFileName = `loader-${file}`;
      }

      fs.writeFileSync(path.join(targetDir, outputFileName), JSON.stringify(manifest, null, 2));
    }
  }

  console.log('Registry built successfully!');
}

buildRegistry().catch(err => {
  console.error('Failed to build registry:', err);
  process.exit(1);
});
