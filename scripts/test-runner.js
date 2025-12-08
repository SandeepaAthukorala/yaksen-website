#!/usr/bin/env node

/**
 * Test Runner Script
 * Runs the chatbot test suite and reports results
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Starting Test Runner...\n');

// Check if dev server is running
async function checkServer() {
    try {
        const response = await fetch('http://localhost:3000');
        return response.ok;
    } catch {
        return false;
    }
}

async function main() {
    const serverRunning = await checkServer();

    if (!serverRunning) {
        console.error('❌ Error: Development server is not running on http://localhost:3000');
        console.error('   Please start the server with: npm run dev\n');
        process.exit(1);
    }

    console.log('✅ Server detected on http://localhost:3000\n');
    console.log('🧪 Running tests with tsx...\n');

    // Run tests using tsx
    const testProcess = spawn('npx', ['tsx', path.join(__dirname, '../tests/chatbot.test.ts')], {
        stdio: 'inherit',
        shell: true,
    });

    testProcess.on('close', (code) => {
        if (code === 0) {
            console.log('\n✨ Test run completed successfully!');
        } else {
            console.log(`\n⚠️  Test run exited with code ${code}`);
        }
        process.exit(code);
    });

    testProcess.on('error', (error) => {
        console.error('❌ Error running tests:', error);
        process.exit(1);
    });
}

main();
