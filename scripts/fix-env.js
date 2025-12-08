import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env.local');
const content = 'GEMINI_API_KEY=AIzaSyD5Dbtq1Sb1YkYvH8_b8ea00NL_5xg9Dmk\n';

try {
    fs.writeFileSync(envPath, content, 'utf8');
    console.log('✅ Successfully wrote .env.local with UTF-8 encoding.');
    console.log('Path:', envPath);
} catch (error) {
    console.error('❌ Failed to write .env.local:', error);
    process.exit(1);
}
